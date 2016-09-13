import {DataProvider} from './dataprovider';

class ScbProvider implements DataProvider{
  name: "scb";
  title: "Statistics Sweden";
  get_data(table_id: string, filter, selection: string[]){
  };

  get_meta(table_id: string){
  }

  get_table_list(){
    
  }
}