import {ChangeDetectionStrategy, Component, inject, Input} from "@angular/core";
import {User} from "../models/user";
import {UserOnlineStore} from "../stores/user-online.store";

@Component({
    selector: 'app-chat-box[user]',
    template: `
        <div [style.right.px]="user.right" class="chat-box">
            <div class="card border-primary">
                <div class="card-header d-flex align-items-center">
                    <img height="50" src="assets/user.png" alt="user-avatar" class="rounded-circle">
                    <p class="text-primary">{{user.displayName}}</p>
                    <div class="ms-auto order-2">
                        <a class="me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg>
                        </a>
                        <a class="me-3" (click)="remove(user.username)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="card-body">
                    <ul style="height: 300px;" class="list-unstyled m-0 p-0">
                        <li class="me-3">
                            <div class="d-flex">
                                <img height="40" src="assets/user.png" alt="" class="me-3 rounded-circle"/>
                                <div class="message-body rounded-3 p-3">tin nhan o day. tin nhan o day. tin nhan o day
                                </div>
                            </div>
                        </li>
                        <li class="me-3">
                            <div class="d-flex justify-content-end">
                                <div class="message-body rounded-3 p-3">tin nhan o day. tin nhan o day</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="card-footer">
                    <form>
                        <div class="d-flex">
                            <input class="form-control" type="text" placeholder="Enter message">
                            <button type="submit" class="btn btn-primary">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .chat-box {
            position: fixed;
            max-width: 320px;
            z-index: 999;
            right: 250px;
            bottom: 1px;
        }

        .message-body {
            background-color: rgba(230, 225, 225, 0.603);
            max-width: 80%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ChatBoxComponent {
    @Input() user!: User;

    private readonly store = inject(UserOnlineStore);

    remove(username: string) {
        this.store.removeUserChatBox(username);
    }
}