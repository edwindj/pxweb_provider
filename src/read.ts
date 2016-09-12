import when = require('when');
import {Promise} from 'when';

//import rest = require('rest');
import rest = require('rest');
import mime = require('rest/interceptor/mime');

import {TableInfo, DataPackage, Schema, Categorical, Field} from './DataPackage';

import * as Px from './pxweb';

// for the moment we are not interested in the structure (version, language etc. of the BASE)
const BASE = "http://api.scb.se/OV0104/v1/doris/en/ssd";
const client = rest.wrap(mime);

function to_TableInfo(item: Px.TableItem): TableInfo {
    return {
        name: item.id,
        title: item.text,
        updated: item.updated
    };
}

function to_DataPackage(id: string, meta: Px.TableMeta){
    const schema: Schema = {fields:[]};
    const dp: DataPackage = {name: id, title: meta.title,
         resources:[{ path:"?", schema:schema}]
    };
    for (let v of meta.variables){
        if (v.code=="ContentCode"){
            const observations = [];
            for (let i in v.values){
                const field : Field = {
                    name: v.values[i],
                    title: v.valueTexts[i],
                    type: "number"
                };
            }
        } else {
            const field: Categorical = {
                name: v.code,
                title: v.text,
                type: "categorical",
                categories: v.values.map((val) => {
                    return {name: val, title: val}
                })
            }
            for (let i in field.categories){
                field.categories[i].title = v.valueTexts[i];
            }
            if (v.time){
                field.type = "period";
            }
            schema.fields.push(field);
        }
    }
}

function get_item_list(url: string, id: string = ""): Promise<Px.ListItem[]>{
    url = `${url}/${id}`;
    return client(url)
      .then( (res: rest.Response) => res.entity as Px.ListItem[])
      .then( (items) => {
          console.log(url)
          const p = items.map((item) => {
              if (item.type == "l"){
                  return get_item_list(url, item.id);
              } else {
                  return when([item]);
              }
          });
          console.log(p);
          return when.all(p).then((res:Px.ListItem[]) => [].concat(...res))
      })
      ;
}

export function get_table_list(): Promise<TableInfo[]>{
    return get_item_list(BASE)
      .then( (items) => {
          const ta = items as Px.TableItem[];
          return ta.map(to_TableInfo);
      });
}


// client(BASE)
//   .then( (res: rest.Response) => res.entity)
//   .then((items: ListItem[]) => items.map(to_TableInfo))
//   .then(console.log)
//   ;
get_table_list().then(console.log);