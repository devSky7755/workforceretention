import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from "../../../@core/data/client.service";
import { NbMenuService } from "@nebular/theme";
import { RolePermissionService } from '../../../common/role/role_permission.service'
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'ngx-client-selection',
    templateUrl: './client-selection.component.html',
    styleUrls: ['./client-selection.component.scss'],
})
export class ClientSelectionComponent implements OnInit {
    logoutResult;
    rows = [];
    count = 0;
    offset = 0;
    limit = 10;
    clients;
    products = [
        { id: 1, name: 'Exit Interview' },
    ];
    workforces = [
        { id: 0, value: 'Less than 100' },
        { id: 1, value: '100 - 249' },
        { id: 2, value: '250 - 499' },
        { id: 3, value: '500 - 999' },
        { id: 4, value: '1,000 - 4,999' },
        { id: 5, value: '5,000 +' }
    ];
    permission;

    // Table Column Client Name, Client Industry, Client Employees, Products

    constructor(private authService: AuthService, private clientService: ClientService, private router: Router, private menuService: NbMenuService, private rolePermissionSerivce: RolePermissionService, private tokenService: NbTokenService) {
    }

    onClickAdd() {
        this.router.navigateByUrl('/pages/clients/client-selection/add');
    }

    ngOnInit() {
        this.page(this.offset, this.limit);
        this.permission = this.rolePermissionSerivce.getRolePermission('Clients')
    }

    /**
     * Populate the table with new data based on the staticPage number
     * @param staticPage The staticPage to select
     */
    onPage(event) {
        this.page(event.offset, event.limit);
    }

    onClickEdit(id) {
        this.router.navigateByUrl('/pages/clients/client-selection/edit/' + id);
    }

    onClickDelete(id) {
        //find the employee name from the rows using
        const client = this.rows.find(x => x.id === id);
        const name = client.name;
        if (client.employees.length > 0) {
            if (confirm("There are employees assigned to this Client, are you sure you want to delete ? " + name)) {
                this.deleteClient(id);
            }
        } else {
            if (confirm("Are you sure to delete " + name)) {
                this.deleteClient(id);
            }
        }

    }

    deleteClient(id) {
        this.clientService.deleteClient(id).subscribe(
            data => {
                console.log(data);
                this.page(this.offset, this.limit);
            },
            err => {
                console.log(err);
            }
        );
    }

    page(offset, limit) {
        this.tokenService.get()
            .subscribe(token => {
                let payload = token.getPayload()
                if (!payload || !payload._id) {
                    this.logout(payload)
                }
                this.clientService.getClients(offset, limit, payload._id).subscribe(data => {
                    this.count = data.totalItems;
                    this.clients = data.clients;
                    const rows = [];
                    this.clients.map((client) => {
                        console.log(client);
                        // Modify staticPage role
                        client.id = client._id;
                        console.log(client.industry !== null);
                        client.industryName = typeof client.industry === 'undefined' || client.industry == null ?
                            '' : client.industry.name;
                        client.product = this.products.find(p => p.id === client.product).name;
                        client.workforce = this.workforces.find(w => w.id === client.workforce).value;
                        rows.push(client);
                    });
                    this.rows = rows;
                    console.log(this.clients);
                },
                    (err) => {
                        console.log(err);
                    }
                );
            })
    }

    logout(payload) {
        this.authService.logout(payload)
            .subscribe(result => {
                this.logoutResult = result
                if (this.logoutResult.success) {
                    localStorage.removeItem('auth_app_token');
                    this.router.navigateByUrl('/auth/login');
                }
            })
    }

}
