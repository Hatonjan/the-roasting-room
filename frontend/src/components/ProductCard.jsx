import elTemplo from '../assets/img/el-templo.png'

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="card-grid">
        <figure className='card-container'>
            <img src={elTemplo} width={170} alt="The templo coffee bag" />
            <figcaption><strong>El Templo</strong></figcaption>
            <p>Brown Sugar, Cherry, Cocoa</p>
            <p><strong>$17.99</strong></p>
            <button>Shop Now</button>
        </figure>
      </div>
    </div>
  );
}
