import { DocumentData } from '@firebase/firestore'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ManagerState {
    uid: string,
    name: string,
    profilePicture: string,
    email: string,
    isGreeted: Boolean,
    academySettings: Object,
    roninAddress: string,
    walletAddress: string,
    scholarsId: string[],

}

const initialState: ManagerState = {
    uid: '',
    name: '',
    profilePicture: '',
    email: '',
    roninAddress: '',
    isGreeted: false,
    walletAddress: '',
    scholarsId: [],
    academySettings: {},
}

export const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {
        updateManagerOnLogin: (state, action: PayloadAction<ManagerState>) => {
            return {
                ...action.payload
            }
        },
        updateManagerScholarsArray: (state, action: PayloadAction<any>) => {
            const { payload: { id, actionType } } = action

            switch (actionType) {
                case 'Add':
                    state.scholarsId.push(action.payload)
                    break;
                case 'Remove':
                    console.log("removing");

                    let clonedArray = [...state.scholarsId]
                    let scholarIndexInArray = clonedArray.indexOf(id)
                    clonedArray.splice(scholarIndexInArray, 1)
                    state.scholarsId = [...clonedArray]
                    console.log(state.scholarsId)
                    break;
                default:
                    break;
            }
        },
    },
})

export const { updateManagerOnLogin, updateManagerScholarsArray } = managerSlice.actions

export default managerSlice.reducer