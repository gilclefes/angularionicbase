import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { TimeDifferencePipe } from "./time-difference.pipe";
import { TimeAgoPipe } from "./time-ago.pipe";
import { TruncateTextPipe } from "./truncate-text.pipe";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [TimeDifferencePipe, TimeAgoPipe, TruncateTextPipe],
  exports: [TimeDifferencePipe, TimeAgoPipe, TruncateTextPipe],
})
export class PipesModule {}
