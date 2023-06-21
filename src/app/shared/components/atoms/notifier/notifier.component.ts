import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/shared/services/notifier.service';

type Notification = 'success' | 'warning' | 'info' | 'danger';

@Component({
  selector: 'shd-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css'],
})
export class NotifierComponent implements OnInit {
  openNotifier = false;
  message = '';
  classTypeAlert = '';
  optAlertIcon = '';

  constructor(private notifierService: NotifierService) {}

  ngOnInit(): void {
    this.notifierService.errorObs.subscribe((message) => {
      this.settingAlert(message, 'danger');
    });

    this.notifierService.successObs.subscribe((message) => {
      this.settingAlert(message, 'success')
    });

    this.notifierService.warningObs.subscribe((message) => {
      this.settingAlert(message, 'warning');
    });

    this.notifierService.infoObs.subscribe((message) => {
      this.settingAlert(message, 'info');
    });
  }

    private settingAlert(message: string, type: Notification) {
        this.message = message;
        this.classTypeAlert = `alert alert-${type}`;
        this.optAlertIcon = type === 'danger' ? 'error' : type;
        this.openNotifier = true;
    }

  closeNotifier(): void {
    this.openNotifier = false;
    this.message = '';
    this.classTypeAlert = '';
    this.optAlertIcon = '';
  }
}
