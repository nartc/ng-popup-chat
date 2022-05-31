import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from "@angular/core";
import {combineLatest, map} from "rxjs";
import {ChatBoxComponent} from "../chat-box/chat-box.component";
import {User} from "../models/user";
import {UserOnlineStore} from "../stores/user-online.store";

@Component({
    selector: 'app-friend-list',
    template: `
        <ng-container *ngIf="vm$ | async as vm">
            <div class="card" style="width: 18rem">
                <div class="card-header">Users Online</div>
                <div class="card-body">
                    <div class="card-title">{{vm.usersOnline.length}} online</div>
                    <div style="cursor: pointer;" *ngFor="let online of vm.usersOnline" (click)="addToChatBox(online)"
                         class="text-primary p-3 rounded-3">
                        {{online.displayName}}
                    </div>
                </div>
            </div>

            <div>
                <app-chat-box *ngFor="let chatbox of vm.usersChatBox" [user]="chatbox"></app-chat-box>
            </div>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, ChatBoxComponent]
})
export class FriendListComponent implements OnInit, OnDestroy {
    private readonly store = inject(UserOnlineStore);

    readonly vm$ = combineLatest([
        this.store.usersOnline$,
        this.store.usersChatBox$
    ]).pipe(map(([usersOnline, usersChatBox]) => ({usersOnline, usersChatBox})))

    readonly users: User[] = [
        {username: 'hoainam10th', displayName: 'Nguyen Hoai Nam'},
        {username: 'ubuntu', displayName: 'Ubuntu Nguyen'},
        {username: 'lisa', displayName: 'Lisa'},
        {username: 'namnguyen', displayName: 'Nguyen Hoai Nam 2'}
    ];

    ngOnInit() {
        for (const user of this.users) {
            this.store.addUser(user);
        }
    }

    ngOnDestroy() {
        for (const user of this.store.usersOnline) {
            this.store.removeUser(user.username);
        }
    }

    addToChatBox(online: User) {
        this.store.addUserChatBox(online);
    }
}