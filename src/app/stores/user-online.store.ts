import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user";

@Injectable({providedIn: 'root'})
export class UserOnlineStore {
    private readonly $usersOnline = new BehaviorSubject<User[]>([]);
    readonly usersOnline$ = this.$usersOnline.asObservable();

    get usersOnline() {
        return this.$usersOnline.getValue();
    }

    private readonly $usersChatBox = new BehaviorSubject<User[]>([]);
    readonly usersChatBox$ = this.$usersChatBox.asObservable();

    get usersChatBox() {
        return this.$usersChatBox.getValue();
    }

    addUser(user: User) {
        this.$usersOnline.next([...this.usersOnline, user]);
    }

    removeUser(username: string) {
        this.$usersOnline.next(this.usersOnline.filter((user => user.username !== username)));
    }

    addUserChatBox(user: User) {
        this.$usersChatBox.next([...this.usersChatBox, {
            username: user.username,
            displayName: user.displayName,
            right: (this.usersChatBox.length + 1) % 2 ? 250 : 250 + 325
        }])
        localStorage.setItem('chatboxusers', JSON.stringify(this.usersChatBox))
    }

    removeUserChatBox(username: string) {
        this.$usersChatBox.next(this.usersChatBox.filter(user => user.username !== username));
    }
}
