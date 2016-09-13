export interface DataProvider {
  name: string,
  title: string,
  license?: string,
  url?: string,
  get_data(table: string, filter: {[id: string]: string[]}, selection: string[]),
  get_meta(table: string),
  get_table_list()
}
