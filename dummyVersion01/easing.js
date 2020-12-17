 /** Provides a sinusoidal easing in function. Value starts slowly at t=0 and
     *  accelerates to a maximum value at t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function sinIn( t)
    {
        return sinIn(t,1);
    }
      
    /** Provides a reversible sinusoidal easing in function. Value starts slowly at
     *  t=0 and accelerates to a maximum value at t=1. If the <code>direction</code>
     *  parameter is negative, the direction of the function is reversed. This can 
     *  be useful for oscillating animations.
     *  @param t Time value between 0-1.
     *  @param direction Direction of easing, forward if non-negative, or reverse if negative.
     *  @return Eased value at the given time step.
     */
    function sinIn( t,  direction)
    {
        if (direction < 0)
        {
            // Reverse direction for a return journey.
            return sinOut(t,1);
        }
        return (1-cos(t*HALF_PI));
    }

    /** Provides a sinusoidal easing out function. Value starts rapidly at t=0 and
     *  decelerates to a minimum value at t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function sinOut(t)
    {
      return sinOut(t,1);
    }

    /** Provides a reversible sinusoidal easing out function. Value starts rapidly at
     *  t=0 and decelerates to a minimum value at t=1. If the <code>direction</code>
     *  parameter is negative, the direction of the function is reversed. This can 
     *  be useful for oscillating animations.
     *  @param t Time value between 0-1.
     *  @param direction Direction of easing, forward if non-negative, or reverse if negative.
     *  @return Eased value at the given time step.
     */
    function sinOut( t,  direction)
    {
        if (direction<0)
        {
            return sinIn(t,1);
        }
        return sin(t*HALF_PI);
    }
    
    /** Provides a sinusoidal easing in and out function. Value starts slowly at t=0, 
     *  accelerates towards t=0.5 and then decelerates towards t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function sinBoth( t)
    {
        return (1-cos(t*PI))/2.0;
    }
    
    /** Provides a cubic easing in function. Value starts slowly at t=0 and  accelerates 
     *  to a maximum value at t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function cubicIn( t)
    {
        return cubicIn(t,1);
    }
    
    /** Provides a reversible cubic easing in function. Value starts slowly at
     *  t=0 and accelerates to a maximum value at t=1. If the <code>direction</code>
     *  parameter is negative, the direction of the function is reversed. This can 
     *  be useful for oscillating animations.
     *  @param t Time value between 0-1.
     *  @param direction Direction of easing, forward if non-negative, or reverse if negative.
     *  @return Eased value at the given time step.
     */
    function cubicIn( t,  direction)
    {
        if (direction < 0)
        {
            return cubicOut(t,1);
        }
        return t*t*t;
    }

    /** Provides a cubic easing out function. Value starts rapidly at t=0 and
     *  decelerates to a minimum value at t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function cubicOut( t)
    {
      return cubicOut(t,1);
    }
    
    /** Provides a reversible cubic easing out function. Value starts rapidly at
     *  t=0 and decelerates to a minimum value at t=1. If the <code>direction</code>
     *  parameter is negative, the direction of the function is reversed. This can 
     *  be useful for oscillating animations.
     *  @param t Time value between 0-1.
     *  @param direction Direction of easing, forward if non-negative, or reverse if negative.
     *  @return Eased value at the given time step.
     */
    function cubicOut( t,  direction)
    {
        if (direction < 0)
        {
            return cubicIn(t,1);
        } 
        let tPrime = 1-t;
        return 1-tPrime*tPrime*tPrime;
    }

    /** Provides a cubic easing in and out function. Value starts slowly at t=0, 
     *  accelerates towards t=0.5 and then decelerates towards t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function cubicBoth( t)
    {
        if (t < 0.5)
        {
            let tPrime = t*2;
            return 0.5*tPrime*tPrime*tPrime;
        }
      
        let tPrime = 2-t*2;
        return 0.5*(2-tPrime*tPrime*tPrime);
    }
    
    /** Provides a quartic easing in function. Value starts slowly at t=0 and  accelerates 
     *  to a maximum value at t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function quarticIn( t)
    {
        return quarticIn(t,1);
    }
    
    /** Provides a reversible quartic easing in function. Value starts slowly at
     *  t=0 and accelerates to a maximum value at t=1. If the <code>direction</code>
     *  parameter is negative, the direction of the function is reversed. This can 
     *  be useful for oscillating animations.
     *  @param t Time value between 0-1.
     *  @param direction Direction of easing, forward if non-negative, or reverse if negative.
     *  @return Eased value at the given time step.
     */
    function quarticIn( t,  direction)
    {
        if (direction < 0)
        {
            return quarticOut(t,1);
        }
        return t*t*t*t;
    }

    /** Provides a quartic easing out function. Value starts rapidly at t=0 and
     *  decelerates to a minimum value at t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function quarticOut( t)
    {
      return quarticOut(t,1);
    }
    
    /** Provides a reversible quartic easing out function. Value starts rapidly at
     *  t=0 and decelerates to a minimum value at t=1. If the <code>direction</code>
     *  parameter is negative, the direction of the function is reversed. This can 
     *  be useful for oscillating animations.
     *  @param t Time value between 0-1.
     *  @param direction Direction of easing, forward if non-negative, or reverse if negative.
     *  @return Eased value at the given time step.
     */
    function quarticOut( t,  direction)
    {
        if (direction < 0)
        {
            return quarticIn(t,1);
        } 
        let tPrime = 1-t;
        return 1-tPrime*tPrime*tPrime*tPrime;
    }

    /** Provides a quartic easing in and out function. Value starts slowly at t=0, 
     *  accelerates towards t=0.5 and then decelerates towards t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function quarticBoth( t)
    {
        if (t < 0.5)
        {
            let tPrime = t*2;
            return 0.5*tPrime*tPrime*tPrime*tPrime;
        }
      
        let tPrime = 2-t*2;
        return 0.5*(2-tPrime*tPrime*tPrime*tPrime);
    }
    
    /** Provides a quintic easing in function. Value starts slowly at t=0 and  accelerates 
     *  to a maximum value at t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function quinticIn( t)
    {
        return quinticIn(t,1);
    }
    
    /** Provides a reversible quintic easing in function. Value starts slowly at
     *  t=0 and accelerates to a maximum value at t=1. If the <code>direction</code>
     *  parameter is negative, the direction of the function is reversed. This can 
     *  be useful for oscillating animations.
     *  @param t Time value between 0-1.
     *  @param direction Direction of easing, forward if non-negative, or reverse if negative.
     *  @return Eased value at the given time step.
     */
    function quinticIn( t,  direction)
    {
        if (direction < 0)
        {
            return quinticOut(t,1);
        }
        return t*t*t*t*t;
    }

    /** Provides a quintic easing out function. Value starts rapidly at t=0 and
     *  decelerates to a minimum value at t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function quinticOut( t)
    {
      return quinticOut(t,1);
    }
    
    /** Provides a reversible quintic easing out function. Value starts rapidly at
     *  t=0 and decelerates to a minimum value at t=1. If the <code>direction</code>
     *  parameter is negative, the direction of the function is reversed. This can 
     *  be useful for oscillating animations.
     *  @param t Time value between 0-1.
     *  @param direction Direction of easing, forward if non-negative, or reverse if negative.
     *  @return Eased value at the given time step.
     */
    function quinticOut( t,  direction)
    {
        if (direction < 0)
        {
            return quinticIn(t,1);
        } 
        let tPrime = 1-t;
        return 1-tPrime*tPrime*tPrime*tPrime*tPrime;
    }

    /** Provides a quintic easing in and out function. Value starts slowly at t=0, 
     *  accelerates towards t=0.5 and then decelerates towards t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function quinticBoth( t)
    {
        if (t < 0.5)
        {
            let tPrime = t*2;
            return 0.5*tPrime*tPrime*tPrime*tPrime*tPrime;
        }
      
        let tPrime = 2-t*2;
        return 0.5*(2-tPrime*tPrime*tPrime*tPrime*tPrime);
    }
    
    /** Provides a parabolic bouncing easing in function. From t=0 value starts with a small
     *  'bounce' that gets larger towards t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function bounceIn( t)
    {
        return bounceIn(t,1);
    }

    /** Provides a reversible parabolic bouncing easing in function. From t=0 value starts
     *  with a small 'bounce' that gets larger towards t=1. If the <code>direction</code>
     *  parameter is negative, the direction of the function is reversed. This can 
     *  be useful for oscillating animations.
     *  @param t Time value between 0-1.
     *  @param direction Direction of easing, forward if non-negative, or reverse if negative.
     *  @return Eased value at the given time step.
     */
    function bounceIn( t,  direction)
    {
        if (direction < 0)
        {
            // Reverse direction for a return journey.
            return bounceOut(t);
        }
      
        let tPrime = 1-t;
      
        if (tPrime < 0.36364)            // 1/2.75
        {
            return 1- 7.5625*tPrime*tPrime;
        }
        
        if (tPrime < 0.72727)            // 2/2.75
        {
            return 1- (7.5625*(tPrime-=0.545454)*tPrime + 0.75);
        }
        
        if (tPrime < 0.90909)            // 2.5/2.75
        {
            return 1- (7.5625*(tPrime-=0.81818)*tPrime + 0.9375);
        }
        
        return 1- (7.5625*(tPrime-=0.95455)*tPrime + 0.984375); 
    }
    

    /** Provides a parabolic bouncing easing out function. From t=0 value starts with an
     *  accelerating motion until destination reached then it bounces back in increasingly
     *  small bounces finally settling at 1 when t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function bounceOut( t)
    {
        return bounceOut(t,1);
    }
      
    /** Provides a reversible parabolic bouncing easing out function. From t=0 value starts with
     *  an accelerating motion until destination reached then it bounces back in increasingly
     *  small bounces finally settling at 1 when t=1. If the <code>direction</code> parameter is
     *  negative, the direction of the function is reversed. This can be useful for oscillating 
     *  animations.
     *  @param t Time value between 0-1.
     *  @param direction Direction of easing, forward if non-negative, or reverse if negative.
     *  @return Eased value at the given time step.
     */
    function bounceOut( t,  direction)
    {
        if (direction < 0)
        {
            // Reverse direction for a return journey.
            return bounceIn(t);
        }
      
        let tPrime = t;
        
        if (tPrime < 0.36364)            // 1/2.75
        {
            return 7.5625*tPrime*tPrime;
        }
        if (tPrime < 0.72727)            // 2/2.75
        {
            return 7.5625*(tPrime-=0.545454)*tPrime + 0.75;
        }
        if (tPrime < 0.90909)            // 2.5/2.75
        {
            return 7.5625*(tPrime-=0.81818)*tPrime + 0.9375;
        }
        
        return 7.5625*(tPrime-=0.95455)*tPrime + 0.984375; 
    }

    /** Provides an elastic easing in function simulating a 'pinged' elastic. From t=0 value starts
     *  with a large perturbation damping down towards a value of 0.5 as t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function elasticIn( t)
    {
        if (t <= 0)
        {
            return 0;
        }

        if (t >= 1)
        {
            return 0.5;
        }

        let p = 0.25;        // Period
        let a = 1.05;        // Amplitude.
        let s = 0.0501716;   // asin(1/a)*p/TWO_PI;
     
        return max(0,0.5 + a*pow(2,-10*t)*sin((t-s)*TWO_PI/p));
    }

    /** Provides an elastic easing out function simulating an increasingly agitated elastic. From
     *  t=0 value starts at 0.5 with increasingly large perturbations ending at 1 when t=1.
     *  @param t Time value between 0-1.
     *  @return Eased value at the given time step.
     */
    function elasticOut( t)
    {
        if (t <= 0)
        {
            return 0.5;
        }

        if (t >= 1)
        {
            return 1;
        }

        let tPrime = 1-t;
        let p = 0.25;        // Period
        let a = 1.05;        // Amplitude.
        let s = 0.0501717;   // asin(1/a)*p/TWO_PI;
     
        return min(1,0.5 - a*pow(2,-10*tPrime)*sin((tPrime-s)*TWO_PI/p));
    }