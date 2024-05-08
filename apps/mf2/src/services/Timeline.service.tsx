import { inject, injectable } from "inversify";
import { PlansService } from "./Plans.service";

@injectable()
export class TimelineService {
  @inject(PlansService)
  plans: PlansService;

  get() {
    return this.plans.get();
  }

  getAll() {
    return this.plans.getAll();
  }
}
