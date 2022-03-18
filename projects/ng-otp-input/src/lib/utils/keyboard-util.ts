export class KeyboardUtil{

    static ifBackspaceOrDelete(event:KeyboardEvent){
        return this.ifKey(event,'Backspace;Delete;Del');
    }
    static ifRightArrow(event:KeyboardEvent){
        return this.ifKey(event,'ArrowRight;Right')
    }
    static ifLeftArrow(event:KeyboardEvent){
        return this.ifKey(event,'ArrowLeft;Left')
    }
    static ifSpacebar(event:KeyboardEvent){
        return this.ifKey(event,'Spacebar; ')//don't remove the space after ; as this will check for space key
    }
    static  ifKey(event:KeyboardEvent, keys:string):boolean{
        let keysToCheck=keys.split(';');
        return keysToCheck.some(k=> k ===event.key);
    }
}