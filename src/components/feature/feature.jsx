function Feature({ srcImg, altImg, title, description }) {
    return (
        <div className="feature-item">
          <img src={srcImg} alt={altImg} className="feature-icon" />
          <h3 className="feature-item-title">{title}</h3>
          <p>{description}</p>
        </div>
    )
}

export default Feature;