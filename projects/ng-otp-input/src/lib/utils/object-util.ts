export class ObjectUtil{
    static keys(obj):string[]{
        if(!obj) return [];
        return Object.keys(obj);
    }
}