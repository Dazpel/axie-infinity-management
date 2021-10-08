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
            state.scholarsId.push(action.payload)
        },
    },
})

export const { updateManagerOnLogin, updateManagerScholarsArray } = managerSlice.actions

export default managerSlice.reducer