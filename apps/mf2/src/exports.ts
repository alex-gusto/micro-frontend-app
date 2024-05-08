import { inversifyContainer } from "./inversify.config";
import { TimelineService } from "./services";

export { Preview } from "./Preview";

export const getServices = () => ({
    TimelineService: inversifyContainer.get(TimelineService),
});
