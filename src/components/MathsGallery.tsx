import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageModal from './ImageModal'

interface Photo {
  id: string
  title: string
  category: 'all' | '3d-shapes' | 'circle-theorems' | 'circle-geometry' | 'triangles' | 'triangle-geometry' | 'symmetry'
  description: string
  image: string
}

const photos: Photo[] = [
  {
    id: 'cone-area',
    title: 'Angle at the Centre Theorem',
    category: 'circle-theorems',
    description: 'A circle theorem model showing that the angle subtended by an arc at the centre of a circle is twice the angle subtended by the same arc at any point on the remaining circumference.',
    image: '/images/maths-park/cone-total-area.jpg',
  },
  {
    id: 'cylinder-volume',
    title: 'Composite Solid: Cone and Hemisphere',
    category: '3d-shapes',
    description: 'A composite 3D model formed by joining a cone and a hemisphere of the same radius. The display shows formulas for the total area and the total volume of the combined solid.',
    image: '/images/maths-park/cylinder-volume.jpg',
  },
  {
    id: 'isosceles-triangle',
    title: 'Cylinder - Volume & Surface Area',
    category: '3d-shapes',
    description: 'A cylinder model displaying formulas for volume, curved surface area, and total surface area. It demonstrates how radius and height determine the cylinder\'s measurements.',
    image: '/images/maths-park/isosceles-triangle.jpg',
  },
  {
    id: 'pyramid-properties',
    title: 'Isosceles Triangle - Line of Symmetry',
    category: 'triangles',
    description: 'A geometric model showing an isosceles triangle and its line of symmetry. The vertical line from the apex to the midpoint of the base divides the triangle into two congruent halves.',
    image: '/images/maths-park/pyramid-properties.jpg',
  },
  {
    id: 'circle-inscribed-triangle',
    title: 'Square Pyramid - Properties',
    category: '3d-shapes',
    description: 'A square pyramid model showing its structure with 5 faces, 8 edges, and 5 vertices. It helps students visualize pyramid properties clearly.',
    image: '/images/maths-park/circle-inscribed-triangle.jpg',
  },
  {
    id: 'circle-tangent',
    title: 'Tangent Lines from an External Point',
    category: 'circle-theorems',
    description: 'A circle theorem model showing that two tangents drawn from the same external point to a circle are equal in length. Each tangent touches the circle at exactly one point.',
    image: '/images/maths-park/circle-tangent.jpg',
  },
  {
    id: 'pythagoras',
    title: 'Introduction to Triangles',
    category: 'triangles',
    description: 'A basic triangle model introducing the shape, its three sides, and three angles. It helps beginner students understand the fundamental properties of triangles.',
    image: '/images/maths-park/pythagoras-theorem.jpg',
  },
  {
    id: 'triangle-intro',
    title: 'Pythagorean Theorem',
    category: 'triangles',
    description: 'A visual proof model demonstrating the Pythagorean Theorem using colored tiles. It shows that in a right triangle, a² + b² = c².',
    image: '/images/maths-park/triangle-intro.jpg',
  },
  {
    id: 'symmetry-patterns',
    title: 'Parts of a Circle',
    category: 'circle-geometry',
    description: 'A circle geometry model showing key parts and measurements such as the centre, diameter, sector, segment, area, circumference, arc length, and sector area.',
    image: '/images/maths-park/symmetry-patterns.jpg',
  },
  {
    id: 'semicircle-angle',
    title: 'Types of Symmetry',
    category: 'symmetry',
    description: 'A display board illustrating different examples of line symmetry and rotational symmetry in geometric shapes. It helps students compare reflection and rotation symmetries.',
    image: '/images/maths-park/semicircle-angle.jpg',
  },
  {
    id: 'circle-sector',
    title: 'Angle in a Semicircle',
    category: 'circle-theorems',
    description: 'A theorem model showing that the angle subtended by a diameter at the circumference is always a right angle (90°). It demonstrates this important circle theorem clearly.',
    image: '/images/maths-park/circle-sector.jpg',
  },
  {
    id: 'circle-tangent-external',
    title: 'Triangle with Inscribed Circle',
    category: 'triangle-geometry',
    description: 'A geometry model showing the incircle of a triangle, where the three internal angle bisectors meet at the incenter. The inscribed circle touches all three sides, and the inradius is given by r = A/s.',
    image: '/images/maths-park/circle-tangent-external.jpg',
  },
]

const categories = [
  { id: 'all', label: 'All (12)' },
  { id: '3d-shapes', label: '3D Shapes' },
  { id: 'circle-theorems', label: 'Circle Theorems' },
  { id: 'circle-geometry', label: 'Circle Geometry' },
  { id: 'triangles', label: 'Triangles' },
  { id: 'triangle-geometry', label: 'Triangle Geometry' },
  { id: 'symmetry', label: 'Symmetry' },
]

export default function MathsGallery() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const filteredPhotos = activeFilter === 'all'
    ? photos
    : photos.filter(p => p.category === activeFilter)

  return (
    <div style={{ padding: '60px 6vw', background: 'var(--off)' }}>
      {/* Filter Bar */}
      <div style={{
        marginBottom: '48px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {categories.map(cat => (
          <motion.button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            style={{
              padding: '10px 24px',
              borderRadius: '25px',
              border: '1.5px solid',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '1px',
              textTransform: 'capitalize',
              background: activeFilter === cat.id ? 'var(--navy)' : '#fff',
              color: activeFilter === cat.id ? '#fff' : 'var(--navy)',
              borderColor: activeFilter === cat.id ? 'var(--blue)' : 'rgba(79,195,247,.2)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Single Result - Centered Standard Card */}
      {filteredPhotos.length === 1 ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <motion.div
            key={filteredPhotos[0].id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setHoveredId(filteredPhotos[0].id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 2px 12px rgba(79,195,247,.08)',
              border: '1px solid rgba(79,195,247,.15)',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '380px',
              width: '100%',
            }}
          >
            {/* Image Container - Standard Height */}
            <motion.div
              onClick={() => setSelectedPhoto(filteredPhotos[0])}
              style={{
                position: 'relative',
                overflow: 'hidden',
                height: '220px',
                background: 'linear-gradient(135deg,var(--navy),var(--navy2))',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={filteredPhotos[0].image}
                alt={filteredPhotos[0].title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  opacity: hoveredId === filteredPhotos[0].id ? 0.75 : 1,
                  transition: 'opacity 0.3s',
                }}
              />
              {/* Hover Overlay */}
              {hoveredId === filteredPhotos[0].id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(79, 195, 247, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                  }}>
                    CLICK TO VIEW
                  </span>
                </motion.div>
              )}
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(79,195,247,0.95)',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                backdropFilter: 'blur(8px)',
              }}>
                {categories.find(c => c.id === filteredPhotos[0].category)?.label}
              </div>
            </motion.div>

            {/* Content Container - Standard Padding */}
            <div style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--navy)',
                marginBottom: '10px',
                margin: 0,
                lineHeight: 1.3,
                minHeight: '32px',
              }}>
                {filteredPhotos[0].title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'var(--gray)',
                lineHeight: 1.6,
                margin: 0,
                flex: 1,
              }}>
                {filteredPhotos[0].description}
              </p>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Gallery Grid - Multiple Results */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}>
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredId(photo.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(79,195,247,.08)',
                  border: '1px solid rgba(79,195,247,.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {/* Image Container - Fixed Height */}
                <motion.div
                  onClick={() => setSelectedPhoto(photo)}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: '220px',
                    background: 'linear-gradient(135deg,var(--navy),var(--navy2))',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      opacity: hoveredId === photo.id ? 0.75 : 1,
                      transition: 'opacity 0.3s',
                    }}
                  />
                  {/* Hover Overlay */}
                  {hoveredId === photo.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(79, 195, 247, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                      }}>
                        CLICK TO VIEW
                      </span>
                    </motion.div>
                  )}
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(79,195,247,0.95)',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(8px)',
                  }}>
                    {categories.find(c => c.id === photo.category)?.label}
                  </div>
                </motion.div>

                {/* Content Container - Fixed Layout */}
                <div style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    marginBottom: '10px',
                    margin: 0,
                    lineHeight: 1.3,
                    minHeight: '32px',
                  }}>
                    {photo.title}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--gray)',
                    lineHeight: 1.6,
                    margin: 0,
                    flex: 1,
                  }}>
                    {photo.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* No Results */}
      {filteredPhotos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--gray)',
          }}
        >
          <p style={{ fontSize: '16px' }}>No photos in this category yet.</p>
        </motion.div>
      )}

      {/* Image Modal */}
      {selectedPhoto && (
        <ImageModal
          image={selectedPhoto.image}
          title={selectedPhoto.title}
          description={selectedPhoto.description}
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={() => {
            const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id)
            if (currentIndex < filteredPhotos.length - 1) {
              setSelectedPhoto(filteredPhotos[currentIndex + 1])
            }
          }}
          onPrev={() => {
            const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id)
            if (currentIndex > 0) {
              setSelectedPhoto(filteredPhotos[currentIndex - 1])
            }
          }}
          hasNext={filteredPhotos.findIndex(p => p.id === selectedPhoto.id) < filteredPhotos.length - 1}
          hasPrev={filteredPhotos.findIndex(p => p.id === selectedPhoto.id) > 0}
        />
      )}
    </div>
  )
}
