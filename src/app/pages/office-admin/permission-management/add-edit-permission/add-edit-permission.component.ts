import { Component, OnInit } from '@angular/core';
import { RoleService } from "../../../../@core/data/role.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'ngx-add-edit-permission',
    templateUrl: './add-edit-permission.component.html',
    styleUrls: ['./add-edit-permission.component.scss']
})
export class AddEditPermissionComponent implements OnInit {

    roleId;
    roleName;
    rolePermissions;
    role;
    rows;
    count = 0;
    successMessage;
    errorMessage;

    constructor(private roleService: RoleService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.rolePermissions = [
            { "table_name": "Office Admin", "has_access": false, "is_update": false, "is_add": false, "is_delete": false },
            // {"table_name": "Products", "is_read": false, "is_write": false, "is_update": false, "is_delete": false},
            // {"table_name": "Articles", "is_read": false, "is_write": false, "is_update": false, "is_delete": false},
            { "table_name": "Surveys", "has_access": false, "is_update": false, "is_add": false, "is_delete": false },
            { "table_name": "Clients", "has_access": false, "is_update": false, "is_add": false, "is_delete": false },
            { "table_name": "Reporting", "has_access": false, "is_update": false, "is_add": false, "is_delete": false },
            // {"table_name": "Links", "is_read": false, "is_write": false, "is_update": false, "is_delete": false}
        ];
        this.roleId = this.route.snapshot.paramMap.get('id');
        if (this.roleId) {
            //get the employee from the database and set to the employee
            this.getRole();
        } else {
            this.page();
        }
        // this.getRoles();
        // this.getRole();
    }

    getRole() {
        this.roleService.getRole(this.roleId).subscribe(
            data => {
                this.setResult(data);
            },
            err => {
                console.log(err);
            }
        );
    }

    hasAccess(rowIndex) {
        this.rolePermissions[rowIndex].has_access = !this.rolePermissions[rowIndex].has_access;
        if (!this.rolePermissions[rowIndex].has_access) {
            this.rolePermissions[rowIndex].is_update = false
            this.rolePermissions[rowIndex].is_add = false
            this.rolePermissions[rowIndex].is_delete = false

            this.rolePermissions[rowIndex].tableUpdate = false
            this.rolePermissions[rowIndex].tableAdd = false
            this.rolePermissions[rowIndex].tableDelete = false
        }
    }

    hasAccessible(rowIndex) {
        return !this.rolePermissions[rowIndex].has_access
    }

    isUpdate(rowIndex) {
        this.rolePermissions[rowIndex].is_update = !this.rolePermissions[rowIndex].is_update;
    }

    isAdd(rowIndex) {
        this.rolePermissions[rowIndex].is_add = !this.rolePermissions[rowIndex].is_add;
    }

    isDelete(rowIndex) {
        this.rolePermissions[rowIndex].is_delete = !this.rolePermissions[rowIndex].is_delete;
    }

    page() {
        const rows = [];
        this.rolePermissions.map((permission) => {
            // This is done only because of _ underscore is not supported by ngx-datatable
            permission.tableName = permission.table_name;
            permission.tableAccess = permission.has_access;
            permission.tableUpdate = permission.has_access ? permission.is_update : false;
            permission.tableAdd = permission.has_access ? permission.is_add : false;
            permission.tableDelete = permission.has_access ? permission.is_delete : false;
            rows.push(permission);
        });
        this.rows = rows;
    }

    createRole() {
        this.rolePermissions.map((permission) => {
            delete permission.tableName;
            delete permission.tableAccess;
            delete permission.tableUpdate;
            delete permission.tableAdd;
            delete permission.tableDelete;
        });
        const role = {
            name: this.roleName,
            permissions: this.rolePermissions
        };
        if (this.roleId) {
            //perform update operation
            this.update(role);
        } else {
            //perform insert operation
            this.insert(role);
        }
    }

    insert(role) {
        // insert the role into the database
        this.roleService.createRole(role).subscribe(
            data => {
                this.successMessage = data.message;
                console.log(data);
                this.setResult(data);
                //get the updated result and set it to the role
            },
            err => {
                console.log(err);
            },
            () => {
                console.log('completed..');
            }
        );
    }

    update(role) {
        // process the role here and execute update function.
        this.roleService.updateRole(role, this.roleId).subscribe(
            data => {
                this.successMessage = data.message;
                this.setResult(data);
                //Get the updated result and set it to the roles
            },
            err => {
                console.log(err);
            },
            () => {
                console.log('completed operation');
            }
        );
    }

    setResult(data) {
        this.role = data.role;
        this.role.permissions.forEach(permission => {
            permission.is_update = permission.is_update ? permission.is_update : false;
            permission.is_add = permission.is_add ? permission.is_add : false;
            permission.is_delete = permission.is_delete ? permission.is_delete : false;
        });
        this.rolePermissions = this.role.permissions;
        this.roleName = this.role.name;
        this.roleId = this.role._id;
        this.page();
    }

}
