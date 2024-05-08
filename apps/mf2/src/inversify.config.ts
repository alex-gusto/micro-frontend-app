import { Container } from "inversify";
import { TimelineService, PlansService } from "./services";

export const inversifyContainer = new Container();

inversifyContainer.bind(TimelineService).toSelf();
inversifyContainer.bind(PlansService).toSelf();
