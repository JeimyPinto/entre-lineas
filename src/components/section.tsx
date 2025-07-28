import Image from "next/image";

export default function MainSection() {
  return (
    <section className="home-section">
      <div className="home-about">
        <Image src="/1-01.png"
          alt="Logo Entre Líneas"
          className="home-logo"
          width={140}
          height={198}
          priority />
        <h2 className="home-title">¿Quiénes somos?</h2>
        <p className="home-description">
          Entre Líneas es un proyecto audiovisual y artístico dedicado a promover y difundir la cultura, así como el talento de artistas, freestylers y músicos colombianos.
        </p>
      </div>
      <div className="home-social">
        <span className="home-social-label">Síguenos:</span>
        <a className="home-social-link"
          href="https://instagram.com/entr3_line4s"
          target="_blank"
          rel="noopener noreferrer">
          <Image src="/skill-icons_instagram.svg"
            alt="Instagram"
            className="home-social-icon"
            width={22.7}
            height={16} />
          Instagram
        </a>
        <a className="home-social-link"
          href="https://www.youtube.com/@Entr3_Line4s"
          target="_blank"
          rel="noopener noreferrer">
          <Image src="/logos_youtube-icon.svg"
            alt="YouTube"
            width={22.7}
            height={16}
            className="home-social-icon" />
          YouTube
        </a>
      </div>
    </section>
  )
}