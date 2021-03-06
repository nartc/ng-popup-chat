import {Component} from '@angular/core';
import {FriendListComponent} from "./friend-list/friend-list.component";

@Component({
    selector: 'app-root',
    template: `
        <div class="container-fluid">
            <app-friend-list></app-friend-list>
        </div>
    `,
    standalone: true,
    imports: [FriendListComponent]
})
export class AppComponent {
}
