interface TableProps {
  data: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
}
const Table = ({ data }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>QTY</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ name, quantity, price, total }, index) => (
          <tr key={index}>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td>{total}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>Footer</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
