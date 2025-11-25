'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Clock,
  CreditCard,
  TrendingUp,
  Sparkles,
  Rocket,
} from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Invoice Like a Pro, Get Paid Faster',
  subtitle:
    'Streamline your billing process with professional invoices, automated reminders, and real-time payment tracking. Perfect for freelancers and small businesses.',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  badgeText: 'Trusted by 10,000+ businesses',
  heroImageUrl:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  heroImageAlt: 'Professional invoicing dashboard',
  features: [
    'Create invoices in under 60 seconds',
    'Accept payments online instantly',
    'Automated payment reminders',
    'Real-time payment tracking',
  ],
  stats: [
    { icon: 'Zap', value: '60s', label: 'Average invoice creation' },
    { icon: 'TrendingUp', value: '40%', label: 'Faster payments' },
    { icon: 'CreditCard', value: '99.9%', label: 'Payment success rate' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    setIsVisible(true);

    // Create floating animation elements
    const elements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      delay: i * 0.5,
      duration: 3 + (i % 3),
    }));
    setFloatingElements(elements);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      Zap: Zap,
      TrendingUp: TrendingUp,
      CreditCard: CreditCard,
      Clock: Clock,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Zap;
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-background via-accent/5 to-primary/5 text-foreground py-20 lg:py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map(element => (
          <div
            key={element.id}
            className="absolute animate-pulse opacity-20"
            style={{
              left: `${20 + element.id * 15}%`,
              top: `${10 + element.id * 12}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          >
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Badge */}
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 w-fit backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              <span data-editable="badgeText">{config.badgeText}</span>
            </Badge>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span
                  data-editable="title"
                  className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse"
                >
                  {config.title}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {config.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-accent/20 transition-all duration-300"
                >
                  <div className="flex-shrink-0 p-1 bg-primary/10 rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span data-editable={`features[${idx}]`} className="text-foreground font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25"
              >
                <Rocket className="mr-2 h-5 w-5" />
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 backdrop-blur-sm"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {config.stats.map((stat, idx) => (
                <Card
                  key={idx}
                  className="bg-card/30 backdrop-blur-sm border-border/50 hover:bg-card/50 transition-all duration-300"
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-primary/10 rounded-full text-primary">
                        {getIcon(stat.icon)}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl overflow-hidden hover:shadow-primary/10 transition-all duration-500">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5">
                  <Image
                    src={config.heroImageUrl}
                    alt={config.heroImageAlt}
                    data-editable-src="heroImageUrl"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Enhanced overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/5" />
                </div>
              </CardContent>
            </Card>

            {/* Enhanced floating elements */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-primary to-accent text-primary-foreground p-4 rounded-2xl shadow-xl animate-bounce">
              <Zap className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-accent to-primary text-accent-foreground p-4 rounded-2xl shadow-xl animate-pulse">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="absolute top-1/2 -right-4 bg-card/80 backdrop-blur-sm border border-border/50 p-3 rounded-xl shadow-lg animate-pulse delay-500">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
