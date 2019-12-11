export class CISSearchTableColumn {
    key: string;
    label: string;
    type: 'default' | 'date' | 'imageIcon' | 'number' | 'link' = 'default';
    imageSrc?: string; // If type == imageIcon

    headerClick?: (element) => any;
    headerStyle?: any;
    headerTooltip?: any;

    cellColor?: (element) => any;
    cellStyle?: (element) => any;
    cellValue?: (element) => any;
    cellClick?: (element) => any;
    cellTooltip?: (element) => any;

    sortable?: boolean;
    sortDirection?: string;
    hidden?: boolean;
}

export class CISSearchTableField {
    key: string;
    type: 'default' | 'dropdown' | 'checkbox' | 'date' = 'default';
    label?: string;
    tooltip?: string;
    valueChange?: (value) => any;
    disabled?: () => any;
    hidden?: () => any;

}

export class CISSearchTabelActions {
    label: string;
    type: 'flat' | 'primary' | 'stroked' = 'primary';
    tooltip?: string;
    click: () => any;
    disabled: () => any;
    hidden: () => any;
}