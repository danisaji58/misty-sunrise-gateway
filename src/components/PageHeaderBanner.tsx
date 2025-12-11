import { cn } from '@/lib/utils';

interface PageHeaderBannerProps {
  title: string;
  subtitle: string;
  image: string;
  className?: string;
}

export const PageHeaderBanner = ({ title, subtitle, image, className }: PageHeaderBannerProps) => {
  return (
    <section className={cn('relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden', className)}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4 animate-fade-up">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
          {subtitle}
        </p>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
