import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from './models/user.model'
import { AddUser, RemoveUser, EditUser } from './actions/user.actions'

export interface UserStateModel {
    users: User[]
}

@State<UserStateModel>({
    name: 'Users',
    defaults: {
        users: []
    }
})


export class UserState {

    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users
    }

    @Action(AddUser)
    add({ getState, patchState }: StateContext<UserStateModel>, { payload }: AddUser) {
        patchState({
            users: [...getState().users, payload]
        })
    }

    @Action(EditUser)
    edit({ getState, patchState }: StateContext<UserStateModel>, { payload }: EditUser) {
        debugger
        const users = getState().users
        let user: User = users.find(obj => obj.name === payload.name)
        if (user) {
            user.ref = payload.ref
            user.tel = payload.tel
            user.address = payload.address
        }
        patchState({
            users: [...getState().users]
        })
    }

    @Action(RemoveUser)
    remove({ getState, patchState }: StateContext<UserStateModel>, { payload }: RemoveUser) {
        patchState({
            users: getState().users.filter(user => user.name !== payload.name)
        })
    }



}