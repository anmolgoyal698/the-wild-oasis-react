import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import { useBookings } from "./hooks/useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  console.log("Bookings table component rerendered");

  if (isLoading) {
    return <Spinner />;
  }

  if (!bookings.length) {
    return <Empty resource="bookings" />;
  }

  console.log("Bookings", bookings);
  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 10.2rem">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default BookingTable;
