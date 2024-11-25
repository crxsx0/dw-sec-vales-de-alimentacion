import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faUtensils, 
  faCheckCircle, 
  faClock, 
  faDollarSign,
  faHome,
  faReceipt,
  faHistory,
  faCalendar,
  faCog,
  faSignOutAlt,
  faUser,
  faPrint,
  faBars
} from '@fortawesome/free-solid-svg-icons';

export const setupIcons = () => {
  library.add(
    faUtensils, 
    faCheckCircle, 
    faClock, 
    faDollarSign,
    faHome,
    faReceipt,
    faHistory,
    faCalendar,
    faCog,
    faSignOutAlt,
    faUser,
    faPrint,
    faBars
  );
};