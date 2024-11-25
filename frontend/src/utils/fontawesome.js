// src/utils/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faCog,
  faTicket,
  faUsers,
  faStore,
  faChartBar,
  faPlus,
  faList,
  faHistory,
  faUserPlus,
  faAddressBook,
  faTasks,
  faPlusSquare,
  faBuilding,
  faExchangeAlt,
  faChartLine,
  faCalendarAlt,
  faFileAlt,
  faChevronRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

export const setupFontAwesome = () => {
  library.add(
    faHome,
    faCog,
    faTicket,
    faUsers,
    faStore,
    faChartBar,
    faPlus,
    faList,
    faHistory,
    faUserPlus,
    faAddressBook,
    faTasks,
    faPlusSquare,
    faBuilding,
    faExchangeAlt,
    faChartLine,
    faCalendarAlt,
    faFileAlt,
    faChevronRight,
    faChevronDown
  );
};