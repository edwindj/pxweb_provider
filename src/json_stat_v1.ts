// NOTE this is JsonStat interface version 1, which is at the time
// of writing used by SCB, SSB and StatFin. 
// Version 2 is better documented.
export interface Dimension {
  label: string,
  category: {
    index: {[id: string]: number} | string[],
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
    value: number[] // or any?
  }
}

import {Schema, Field, DataPackage}  from './DataPackage';

//higher order utility function: creates a function that checks if it is part of a collection
function is_a<T>(collection?: T[]){
  if (!collection){
    return ((value) => false);
  }
  return ((value: T) => collection.indexOf(value) > -1);
}

function to_hash(index){
  if (index.constructor === Array){
    const hash = {};
    for (let i in index){
      hash[index[i]] = +i;
    }
    return hash;
  }
  return index;
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
  
  if (!dim.role) {
    dim.role = {metric: [], time: []};
  }
  
  //utility functions
  const is_a_metric = is_a(dim.role.metric);
  const is_time = is_a(dim.role.time);

  for (let code of dim.id){
    const d: Dimension = dim[code];
    if (is_a_metric(code)){
      let {index, label} = d.category;
      index = to_hash(index);
      label = label || {};
      for (let value in index){
        const field = { name: value, title: label[value], type: "number", unit: ""};
        fields.push(field);
      }      
    } else {
      const field = { name: code, title: d.label, categories: [], type: "categorical" };
      let {index, label} = d.category;
      index = to_hash(index);
      label = label || {};
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
  const value = data.dataset.value;
  const size = data.dataset.dimension.size;
  
  
  for (let i in value){
  }
  return dp;
}

// const jstat:JsonStat = require("../examples/jsonstat.json");
// let dp = to_DataPackage(jstat, "hello");
// console.log(JSON.stringify(dp));

const j_data:JsonStat = require("../examples/order_v1.json");

const data = to_data(j_data);
console.log(JSON.stringify(data));

const idx = 5;
const size = [2, 3];

let c_size = size.slice().reverse();
let factor = 1;
for (let i in c_size){
  const f = factor * c_size[i];
  c_size[i] = factor;
  factor = f;
}
c_size = c_size.reverse();

let index = [];
for (let i in size){
  index[i] = Math.floor(idx/c_size[i]) % size[i];
  console.log("i", size[i], c_size[i])
}

//console.log(c_size);
//console.log(index);