import Types from "../../types";

export function onToggle(toggle) {
	console.log(toggle);
	return {
		type: Types.TOGGLE_MENU,
		toggle: toggle
	};
}