export interface TableInfo {
    name: string,
    title: string,
    summary?: string,
    description?: string,
    updated?: string
}

export interface Field {
    name: string,
    title?: string,
    type?: string
};

export interface Schema {
    fields: Field[]
}

// extension
export interface Category{
    name: string,
    title: string,
    description?: string
}

export interface Categorical extends Field{
    categories: Category[],
    default?: string,
    agg?: string
}

export interface Resource{
    path: string,
    schema: Schema

}
export interface DataPackage {
    name: string,
    title?: string,
    description?: string,
    resources: Resource[]
}