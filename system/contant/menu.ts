export interface MenuNode {
	label?: string;
	value: string;
	next?: MenuNode[] | MenuNode;
}

export const menu: MenuNode[] = [
	{
		value: "創新課程推動成果",
		next: [{
			value: "主動式課程",
		}, {
			value: "SDGs課程",
		}]
	}, {
		value: "教學獎勵獲獎教師"
	}
];