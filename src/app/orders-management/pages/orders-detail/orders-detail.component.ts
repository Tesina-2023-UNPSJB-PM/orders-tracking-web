import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceOrderDTO } from 'src/app/dtos/service-order.dto';

@Component({
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css'],
})
export class OrdersDetailComponent implements OnInit {
  private _serviceOrder: ServiceOrderDTO | undefined = undefined;

  constructor(private route: ActivatedRoute) {}

  model: string = '';

  protected get number(): string {
    return this._serviceOrder?.number ?? '';
  }

  protected get description(): string {
    return this._serviceOrder?.description ?? '';
  }

  protected get observations(): string {
    return this._serviceOrder?.observations ?? '';
  }

  protected set number(number: string) {
    if (!this._serviceOrder) return;
    this._serviceOrder.number = number;
  }

  protected set description(description: string) {
    if (!this._serviceOrder) return;
    this._serviceOrder.description = description;
  }

  protected set observations(observations: string) {
    if (!this._serviceOrder) return;
    this._serviceOrder.observations = observations;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      ({ serviceOrder }) => (this._serviceOrder = JSON.parse(serviceOrder))
    );
  }
}
