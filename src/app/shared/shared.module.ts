import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedComponentsModule } from './components/shared.components.module'

@NgModule({
  imports: [CommonModule],
  exports: [SharedComponentsModule],
})
export class SharedModule {}
