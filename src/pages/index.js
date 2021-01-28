import Loadable from "react-loadable";
// import Buttons from './Buttons';
import Dashboard from "./Dashboard";
import Advert from "./advert";
import AdHooksPage from "./advertHooks";
import Loading from "./Loading";
import Modals from "./Modals";
import BaseAnimations from "./BaseAnimations";
import ExampleAnimations from "./ExampleAnimations";
import BaseTables from "./BaseTables";
import HighTables from "./HighTables";
import Message2 from "./Message2";
import Message3 from "./Message3";
import Message5 from "./Message5";
import Message6 from "./Message6";

const Buttons = Loadable({
	// 按需加载富文本配置
	loader: () => import("./Buttons"),
	loading: Loading,
});
export default {
	Buttons,
	Dashboard,
	Advert,
	AdHooksPage,
	Loading,
	Modals,
	BaseAnimations,
	ExampleAnimations,
	BaseTables,
	HighTables,
	Message2,
	Message3,
	Message5,
	Message6
};