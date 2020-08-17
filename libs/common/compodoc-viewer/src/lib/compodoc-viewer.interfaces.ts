export namespace CompodocViewer {
  export interface Project {
    name: string;
    url: string;
  }
  export interface Compodoc {
    pipes: any[];
    interfaces: Interface[];
    injectables: any[];
    classes: any[];
    directives: Directive[];
    components: Component[];
    modules: Module[];
    miscellaneous: Miscellaneous;
  }

  export interface Component {
    name: string;
    id: string;
    file: string;
    changeDetection: string;
    encapsulation: any[];
    entryComponents: any[];
    inputs: any[];
    outputs: any[];
    providers: any[];
    selector: string;
    styleUrls: string[];
    styles: any[];
    templateUrl: string[];
    viewProviders: any[];
    inputsClass: InputsClass[];
    outputsClass: InputsClass[];
    propertiesClass: PropertiesClass[];
    methodsClass: MethodsClass[];
    hostBindings: any[];
    hostListeners: any[];
    description: string;
    rawdescription: string;
    type: string;
    sourceCode: string;
    assetsDirs: any[];
    styleUrlsData: StyleUrlsDatum[];
    stylesData: string;
    constructorObj: ConstructorObj;
    implements: string[];
    accessors: ComponentAccessors;
    templateData: string;
  }

  export interface ComponentAccessors {
    direction: Dir;
    unit: Dir;
    gutterSize: Dir;
    gutterStep: Dir;
    restrictMove: Dir;
    useTransition: Dir;
    disabled: Dir;
    dir: Dir;
    gutterDblClickDuration: Dir;
  }

  export interface Dir {
    name: string;
    setSignature: SetSignature;
    getSignature: InputsClass;
  }

  export interface InputsClass {
    name: string;
    type: InputsClassType;
    returnType?: string;
    line: number;
    defaultValue?: string;
  }

  export enum InputsClassType {
    Boolean = 'boolean',
    Empty = '',
    EventEmitter = 'EventEmitter',
    Number = 'number',
    ObservableIOutputAreaSizes = 'Observable<IOutputAreaSizes>',
  }

  export interface SetSignature {
    name: string;
    type: ReturnTypeEnum;
    args: Arg[];
    returnType: ReturnTypeEnum;
    line: number;
    jsdoctags: Jsdoctag[];
  }

  export interface Arg {
    name: string;
    type?: string;
  }

  export interface Jsdoctag {
    name: string;
    type?: string;
    tagName: TagName;
  }

  export interface TagName {
    text: Text;
  }

  export enum Text {
    Param = 'param',
  }

  export enum ReturnTypeEnum {
    Boolean = 'boolean',
    IOutputAreaSizes = 'IOutputAreaSizes',
    Void = 'void',
  }

  export interface ConstructorObj {
    name: string;
    description: string;
    args: Arg[];
    line: number;
    jsdoctags: Jsdoctag[];
  }

  export interface MethodsClass {
    name: string;
    args: Arg[];
    optional: boolean;
    returnType: ReturnTypeEnum;
    typeParameters: any[];
    line: number;
    modifierKind: number[];
    jsdoctags?: Jsdoctag[];
  }

  export interface PropertiesClass {
    name: string;
    defaultValue?: string;
    type: string;
    optional: boolean;
    description: string;
    line: number;
    modifierKind?: number[];
  }

  export interface StyleUrlsDatum {
    data: string;
    styleUrl: string;
  }

  export interface Directive {
    name: string;
    id: string;
    file: string;
    type: string;
    description: string;
    sourceCode: string;
    selector: string;
    providers: any[];
    inputsClass: InputsClass[];
    outputsClass: any[];
    hostBindings: any[];
    hostListeners: any[];
    propertiesClass: PropertiesClass[];
    methodsClass: MethodsClass[];
    implements: string[];
    constructorObj: ConstructorObj;
    accessors: DirectiveAccessors;
  }

  export interface DirectiveAccessors {
    order: Dir;
    size: Dir;
    minSize: Dir;
    maxSize: Dir;
    lockSize: Dir;
    visible: Dir;
  }

  export interface Interface {
    name: string;
    id: string;
    file: string;
    type: string;
    sourceCode: string;
    properties: Property[];
    indexSignatures: any[];
    kind?: number;
    methods: any[];
    extends?: string;
  }

  export interface Property {
    name: string;
    type: string;
    optional: boolean;
    description: string;
    line: number;
  }

  export interface Miscellaneous {
    variables: any[];
    functions: Function[];
    typealiases: any[];
    enumerations: any[];
    groupedVariables: Grouped;
    groupedFunctions: GroupedFunctions;
    groupedEnumerations: Grouped;
    groupedTypeAliases: Grouped;
  }

  export interface Function {
    name: string;
    file: File;
    ctype: Ctype;
    subtype: Subtype;
    description: string;
    args: Arg[];
    returnType?: string;
    jsdoctags: Jsdoctag[];
  }

  export enum Ctype {
    Miscellaneous = 'miscellaneous',
  }

  export enum File {
    SrcLIBSplitContentUtilsTs = 'src/lib/split-content.utils.ts',
  }

  export enum Subtype {
    Function = 'function',
  }

  export interface Grouped {
    foo: 'bar'
  }

  export interface GroupedFunctions {
    'src/lib/split-content.utils.ts': Function[];
  }

  export interface Module {
    name: string;
    children: Child[];
  }

  export interface Child {
    type: string;
    elements: Element[];
  }

  export interface Element {
    name: string;
  }
}
