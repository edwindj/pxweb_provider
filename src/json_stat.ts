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

import {Schema, Field, DataPackage}  from './DataPackage';

function is_a<T>(collection: T[]){
  return ((value: T) => collection.indexOf(value) > -1);
}

function to_DataPackage(data: JsonStat, id?: string){
  const schema: Schema = {fields: []};

  const dp: DataPackage = {
    name: id || data.dataset.label,
    title: data.dataset.label,
    resources: [{path:"", schema: schema}]
  }
  const fields = schema.fields;

  const dim = data.dataset.dimension;
  
  //utility functions
  const is_a_metric = is_a(dim.role.metric);
  const is_time = is_a(dim.role.time);

  for (let code of dim.id){
    const d: Dimension = dim[code];
    if (is_a_metric(code)){
      const {index, label} = d.category;
      for (let value in index){
        const field = { name: value, title: label[value], type: "number", unit: ""};
        fields.push(field);
      }      
    } else {
      const field = { name: code, title: d.label, categories: [], type: "categorical" };
      const {index, label} = d.category;
      for (let value in index){
        field.categories[index[value]] = {
          name: value,
          title: label[value]
        }
      }
      if (is_time(code)) {
        field.type = "date";
      }
      fields.push(field);
    }
  }
  return dp;
}

export function to_data(data: JsonStat, dp?: DataPackage){
  if (!dp){
    dp = to_DataPackage(data);
  }
}

const jstat:JsonStat = require("../examples/jsonstat.json");
let dp = to_DataPackage(jstat, "hello");
console.log(JSON.stringify(dp));