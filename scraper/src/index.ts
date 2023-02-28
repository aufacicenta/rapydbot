import { Controller } from "./service/gt/real-estate/antiguafinehomes.com/controller";

const run = async () => {
  const gt = {
    real_estate: {
      "antiguafinehomes.com": {
        controller: new Controller(),
      },
    },
  };

  await gt.real_estate["antiguafinehomes.com"].controller.getFullPageScreenshots();
};

run();
