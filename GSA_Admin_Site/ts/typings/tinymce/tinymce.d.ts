// incomplete definitions for http://www.tinymce.com

interface TinyMCEObservable {
    off: (name?:string, callback?:Function) => Object
    on: (name:string, callback:Function) => Object
    fire: (name:string, args?:Object, bubble?:Boolean) => Event
}

/**
 * This class contains the core logic for a TinyMCE editor.
 */
interface TinyMCEEditor extends TinyMCEObservable {

    /**
     * URI object to current document that holds the TinyMCE editor instance.
     */
    baseURI: TinyMCEURI

    /**
     * Array with CSS files to load into the iframe.
     */
    contentCSS: string[]

    /**
     * Array of CSS styles to add to head of document when the editor loads.
     */
    contentStyles: string[]


    destroy: (automatic:boolean) => void
    remove: () => void
    hide: () => void
    show: () => void
    getContent: (args?:Object) => string
    setContent: (content:string, args?:Object) => string
    focus: (skip_focus?:Boolean) => void
    undoManager: TinyMCEUndoManager
    settings: Object
}

interface TinyMCEUndoManager {
    undo: () => Object
    clear: () => void
    hasUndo: () => Boolean
}

interface TinyMceEvent {

}

/**
 * This class is responsible for managing UI control instances. It's both a factory and a collection for the controls.
 */
interface TinyMCEControlManager {

    /**
     * Constructs a new control manager instance. Consult the Wiki for more details on this class.
     * @param editor TinyMCE editor instance to add the control to.
     * @param settings Optional settings object for the control manager.
     */
    new (editor: TinyMCEEditor, settings?: any)

    add: (control: TinyMCEControl) => TinyMCEControl

    createButton: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    createColorSplitButton: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    createControl: (name: string) => TinyMCEControl

    createDropMenu: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    createListBox: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    createMenuButton: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    createSeparator: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    createSplitButton: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    createToolbar: (id: string, settings?: any, control?: TinyMCEControl) => TinyMCEControl

    destroy: () => void

    get: (id: string) => void

    setActive: (id: string, state: boolean) => TinyMCEControl
}

interface TinyMCEStatic extends TinyMCEObservable {
    init: (settings:Object) => void;
    execCommand: (c:string, u:Boolean, v:string) => Boolean;
    activeEditor: TinyMCEEditor;
    get: (id:String) => TinyMCEEditor;
    util: TinyMCEUtil
}


declare var tinymce: TinyMCEStatic;
