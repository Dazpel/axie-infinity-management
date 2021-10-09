
import { doc, getDoc, setDoc, updateDoc, arrayUnion, collection, arrayRemove, deleteDoc } from "firebase/firestore";
import { firebaseDb } from "../components/AuthProvider/fbConfig";


export const fetchUserDetails = async (id) => {
    const docRef = doc(firebaseDb, "managers", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        return {
            success: true,
            data: docSnap.data()
        }
    } else {
        return {
            success: false,
            message: "manager not found"
        }
    }
}

export const fetchScholarAccountData = async (scholarId) => {
    const scholarRef = doc(firebaseDb, "scholars", scholarId);
    const scholarSnap = await getDoc(scholarRef);

    if (scholarSnap.exists()) {
        const scholarData = scholarSnap.data()
        const roninAddress = scholarData.axie_roninAddress.replace('ronin:', '0x')

        try {
            let data = await fetch(`https://game-api.skymavis.com/game-api/clients/${roninAddress}/items/1`)
                .then(res => res.json())
                .then(
                    (result) => {
                        const currentDate = new Date()
                        const differenceInTime = (currentDate) - (result.last_claimed_item_at * 1000)
                        const daysElapsed = Math.round(differenceInTime / (1000 * 3600 * 24));
                        const slpAverage = Math.round(result.total / daysElapsed)
                        const managerShare = {
                            percentage: scholarData.manager_share,
                            slp: Math.round(result.total * (scholarData.manager_share / 100))
                        }
                        const scholarShare = {
                            percentage: scholarData.scholar_share,
                            slp: Math.round(result.total * (scholarData.scholar_share / 100))
                        }
                        return {
                            id: scholarId,
                            name: scholarData.name,
                            total: result.total,
                            slpAverage,
                            managerShare,
                            scholarShare,
                            lastClaimedDays: daysElapsed,
                            unclaimedSlp: result.claimable_total
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                )

            return {
                success: true,
                data,
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

}

export const createNewScholar = async (scholarData, managerId) => {
    console.log({ scholarData, managerId })
    try {

        const managerRef = doc(firebaseDb, "managers", managerId)
        const scholarRef = doc(collection(firebaseDb, "scholars"));

        const docData = {
            ...scholarData,
            scholar_roninAddress: null,
            claimed_slp_pictures: [],
            isGreeted: false,
        };
        //Create scholar doc in Firebase
        await setDoc(scholarRef, docData);
        //Update managers array of scholar
        await updateDoc(managerRef,
            {
                scholarsId: arrayUnion(scholarRef?.id)
            }
        )

        return {
            success: true,
            scholarId: scholarRef.id
        }

    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}

export const fetchOneCoinPrice = async (coin) => {
    return await fetch(`https://api.coingecko.com/api/v3/coins/${coin}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
        .then(res => res.json())
        .then(
            (result) => {
                return coin === "smooth-love-potion"
                    ? Number((result.market_data.current_price.usd).toFixed(3))
                    : result.market_data.current_price.usd
            },
            (error) => {
                console.log(error);
            }
        )
}

export const fetchCryptoCoins = async (iconsArray) => {
    let data = []
    let fetchFunction = async (coin, IconSvg) => {
        await fetch(`https://api.coingecko.com/api/v3/coins/${coin}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
            .then(res => res.json())
            .then(
                (result) => {
                    let price = coin === "smooth-love-potion"
                        ? Number((result.market_data.current_price.usd).toFixed(3))
                        : result.market_data.current_price.usd
                    data.push({
                        price,
                        coinName: coin,
                        percentageChange_24h: Number((result.market_data.price_change_percentage_24h).toFixed(2)),
                        icon: <IconSvg />
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    let coins = ['ethereum', 'smooth-love-potion', 'axie-infinity']

    for (let index = 0; index < coins.length; index++) {
        let IconSvg = iconsArray[index]
        await fetchFunction(coins[index], IconSvg)
    }

    return { success: true, data }
}

export const deleteOneScholar = async (scholarId, managerId) => {
    try {

        const managerRef = doc(firebaseDb, "managers", managerId)
        //We first delete the reference from the manager's array
        await updateDoc(managerRef,
            {
                scholarsId: arrayRemove(scholarId)
            }
        )

        //then we delete the document from the scholars collection
        await deleteDoc(doc(firebaseDb, "scholars", scholarId));

        return {
            success: true,
        }

    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}