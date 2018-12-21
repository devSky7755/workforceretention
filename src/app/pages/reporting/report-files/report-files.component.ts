import {Component, OnInit} from '@angular/core';

import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-report-files',
  templateUrl: './report-files.component.html',
  styleUrls: ['./report-files.component.scss'],
})
export class ReportFilesComponent implements OnInit {

  settings = {
    mode: 'external',
    hideSubHeader: true,
    actions: {
      position: 'right',
      // edit: false,
      add: false,
      // delete: false,
      //   custom: [{ name: 'ourCustomAction', title: '<i class="nb-compose"></i>' }],
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      // confirmSave: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      // confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false,
      },
      reportTitle: {
        title: 'Report Title',
        type: 'string',
        filter: false,

      },
      clientName: {
        title: 'Client Name',
        type: 'string',
        filter: false,

      },
      org: {
        title: 'Org.',
        type: 'string',
        filter: false,
      },
      div: {
        title: 'Div.',
        type: 'string',
        filter: false,
      },
      products: {
        title: 'Products',
        type: 'string',
        filter: false,
      },
      dept: {
        title: 'Dept.',
        type: 'string',
        filter: false,
      },
      lastUpdate: {
        title: 'Last Update',
        type: 'string',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private router: Router) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    console.log(event);
  }

  onAddConfirm(event) {
    this.router.navigateByUrl('/pages/reporting/report-files/add-edit-report');
  }

  // onCreateConfirm(event) {
  //   if (window.confirm('Are you sure you want to create?')) {
  //     event.newData['name'] += ' + added in code';
  //     event.confirm.resolve(event.newData);
  //   } else {
  //     event.confirm.reject();
  //   }
  // }

  ngOnInit() {
  }

}
