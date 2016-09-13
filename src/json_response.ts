export interface Column{
    code: string,
    text: string,
    comment?: string,
    type: string;
}

export interface Comment {
    variable: string,
    value: string,
    comment: string
}

export interface DataItem {
    key: string[],
    values: string[]
}

export interface Response {
    columns: Column[],
    comments?: Comment[],
    data: DataItem[]
}

export function to_data(json: Response): Object[]{
    const vals = [];
    
    let keys = json.columns
      .filter((col)=> col.type != "c")
      .map((col) => col.code);
    let values = json.columns
      .filter((col)=> col.type == "c")
      .map((col) => col.code);
    
    for (let item of json.data){
        const val = {};
        for (let i in item.key){
            val[keys[i]] = item.key[i];
        }
        for (let i in item.values){
            val[values[i]] = item.values[i];
        }
        vals.push(val);
    }
    return vals;
}


// let json = require("../examples/json_response.json");
// to_data(json);