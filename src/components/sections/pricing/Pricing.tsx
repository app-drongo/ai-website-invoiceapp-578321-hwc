'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, X, Zap, Star, Crown } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Pricing That Powers Your Growth',
  subtitle: 'Start free, scale fast. Choose the perfect plan for your invoicing needs.',
  plans: [
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      description: 'Perfect for freelancers and solo entrepreneurs',
      icon: 'zap',
      features: [
        'Up to 50 invoices per month',
        'Beautiful invoice templates',
        'Email & chat support',
        'Payment tracking dashboard',
        'Basic reporting',
      ],
      limitations: ['No custom branding', 'Limited integrations'],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=starter',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'Built for growing businesses and teams',
      icon: 'star',
      features: [
        'Unlimited invoices & clients',
        'Custom branded templates',
        'Priority support & onboarding',
        'Advanced payment tracking',
        'Team collaboration tools',
        'API & app integrations',
        'Advanced analytics',
      ],
      limitations: [],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=professional',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'Enterprise-grade features for large teams',
      icon: 'crown',
      features: [
        'Everything in Professional',
        'Multi-company management',
        'Advanced user permissions',
        'Dedicated success manager',
        'Custom integrations & API',
        'White-label solution',
        'SLA & compliance support',
      ],
      limitations: [],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
      popular: false,
    },
  ],
  guarantee: '30-day money-back guarantee • Cancel anytime',
  faq: [
    {
      question: 'Can I switch plans anytime?',
      answer:
        "Absolutely! Upgrade or downgrade instantly. Changes take effect immediately and we'll prorate your billing.",
    },
    {
      question: 'Is there really a free trial?',
      answer:
        'Yes! All plans include a 14-day free trial with full access to features. No credit card required to start.',
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="h-6 w-6" />;
      case 'star':
        return <Star className="h-6 w-6" />;
      case 'crown':
        return <Crown className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            <span data-editable="title">{config.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-muted/50 p-1 rounded-xl border border-border">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 relative ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-primary shadow-lg scale-105 bg-gradient-to-b from-primary/5 to-transparent'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 mx-auto ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {getIcon(plan.icon)}
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>

                <div className="mb-4">
                  <span className="text-5xl font-bold">
                    <span data-editable={`plans[${idx}].price`}>{plan.price}</span>
                  </span>
                  <span className="text-muted-foreground text-lg">
                    <span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                  </span>
                </div>

                <p className="text-muted-foreground">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span
                        className="text-sm leading-relaxed"
                        data-editable={`plans[${idx}].features[${featureIdx}]`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitIdx) => (
                    <li key={limitIdx} className="flex items-start gap-3 text-muted-foreground">
                      <div className="bg-muted rounded-full p-1 mt-0.5">
                        <X className="h-4 w-4" />
                      </div>
                      <span
                        className="text-sm leading-relaxed"
                        data-editable={`plans[${idx}].limitations[${limitIdx}]`}
                      >
                        {limitation}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={`w-full transition-all duration-200 ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border hover:border-primary/50'
                  }`}
                  size="lg"
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantee */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground text-lg">
            <span data-editable="guarantee">{config.guarantee}</span>
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {config.faq.map((item, idx) => (
              <Card key={idx} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-8">
                  <h3 className="font-semibold text-lg mb-3">
                    <span data-editable={`faq[${idx}].question`}>{item.question}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <span data-editable={`faq[${idx}].answer`}>{item.answer}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
