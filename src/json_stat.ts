export interface Dimension {
  label: string,
  category: {
    index: {[id: string]: number},
    label: {[id: string]: string},
    unit?: {[id: string]: any}
  }
}

export interface JsonStat{
  dataset: {
    dimension: {
      [dim_id: string]: any // will be of type Dimension
      id: string[],
      size: number[],
      role: {
        metric: string[],
        time: string[]
      }
    },
    label: string,
    source: string,
    updated: string,
    values: number[] // or any?
  }
}

function to_DataPackage(data: JsonStat){
  const dim = data.dataset.dimension;
  for (let code of dim.id){
    const d: Dimension = dim[code];
    console.log(d)
  }
}

const jstat:JsonStat = require("../examples/jsonstat.json");
to_DataPackage(jstat);