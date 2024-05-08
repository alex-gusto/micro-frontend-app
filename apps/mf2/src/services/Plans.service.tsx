import { Colors } from "../domain";
import { injectable } from "inversify";

@injectable()
export class PlansService {
  getAll() {
    return [
      {
        color: Colors.green,
        children: "Create a services site 2015-09-11",
      },
      {
        color: Colors.green,
        children: "Create a services site 2015-09-01",
      },
      {
        color: Colors.red,
        children: (
          <>
            <p>Solve initial network problems 1</p>
            <p>Solve initial network problems 2</p>
            <p>Solve initial network problems 3 2015-09-01</p>
          </>
        ),
      },
      {
        children: (
          <>
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </>
        ),
      },
      {
        color: Colors.gray,
        children: (
          <>
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </>
        ),
      },
      {
        color: Colors.gray,
        children: (
          <>
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </>
        ),
      },
      {
        color: "#00CCFF",
        children: <p>Custom color testing</p>,
      },
    ];
  }

  get() {
    return [
      {
        children: "Create a services site 2015-09-01",
      },
      {
        children: "Solve initial network problems 2015-09-01",
        color: "green",
      },
      {
        color: "yellow",
        children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
      },
      {
        color: "red",
        children: "Network problems being solved 2015-09-01",
      },
      {
        children: "Create a services site 2015-09-01",
      },
      {
        color: "yellow",
        children: "Technical testing 2015-09-01",
      },
    ];
  }
}
