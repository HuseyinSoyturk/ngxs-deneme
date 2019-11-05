import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddUser, EditUser, RemoveUser } from './actions/user.actions';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngxs-deneme';

  users$: Observable<User>
  editUser: User

  constructor(private store: Store) {
    this.users$ = this.store.select(state => state.Users.users)
  }

  onClickAdd(name, tel, address, ref) {

    this.store.dispatch(new AddUser({ name, tel, address, ref }))
  }

  onClickShow(user) {
    this.editUser = user;
  }
  onClickEdit(name, tel, address, ref) {
    this.store.dispatch(new EditUser({ name, tel, address, ref }))
  }
  onClickDelete(user) {
    this.store.dispatch(new RemoveUser(user))
  }
}
