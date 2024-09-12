import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";
import Table from "../../ui/Table";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();

  if (isLoading) {
    return <Spinner />;
  }

  const columnWidths = "0.6fr 1.8fr 2.2fr 1fr 1fr 1fr";

  return (
    <Table columns={columnWidths}>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={cabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
};

export default CabinTable;
