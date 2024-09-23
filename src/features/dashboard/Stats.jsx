import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays, numCabins }) => {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => {
    return acc + cur.totalPrice;
  }, 0);

  const checkins = confirmedStays.length;

  // occupancyRate = numCheckedInNights / all available nights
  const numCheckedInNights = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );

  const allAvailableNights = numDays * numCabins;

  const occupancyRate =
    Math.round((numCheckedInNights / allAvailableNights) * 100) + "%";

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      ></Stat>
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      ></Stat>
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      ></Stat>
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupancyRate}
      ></Stat>
    </>
  );
};

export default Stats;
