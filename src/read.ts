import when = require('when');
//import rest = require('rest');
import rest = require('rest');
import mime = require('rest/interceptor/mime');

import {TableInfo} from './DataPackage';

import {ListItem, TableItem}  from './pxweb';

// for the moment we are not interested in the structure (version, language etc. of the BASE)
const BASE = "http://api.scb.se/OV0104/v1/doris/en/ssd";
const client = rest.wrap(mime);

function to_TableInfo(item: TableItem): TableInfo {
    return {
        name: item.id,
        title: item.text,
        updated: item.updated
    };
}

export function read_table_meta(url:string, table: string) : when.Promise<TableInfo>{
    return when(table);
}

export function get_table_list(): when.Promise<TableInfo[]>{
    const list: TableInfo[] = [];
    const a = {name: "hi", title: "hello"};
    list.push(a);
    return when(list);
}


client(BASE).then(
    (items: ListItem[]) => {
        return "";
    }
);
