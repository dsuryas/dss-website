---
title: "Building Phoenix Codie: A Chill Figma-to-React Code Generator for Design Systems"
date: "March 15, 2023"
excerpt: "In this article, I share my journey of building Phoenix Codie, a tool that converts Figma designs directly into React components, reducing frontend development time by 70-80%."
tags: ["React", "Figma API", "Design Systems", "Automation"]
---

## Project Overview

Phoenix Codie is a sophisticated tool that automates the conversion of Figma designs into production-ready React code. It serves as a bridge between designers and developers, significantly reducing the time and effort required to transform design mockups into functional components.

Every product team knows the struggle: you've crafted a drop-dead gorgeous component in Figma, but then reality hits and you realise that turning it into actual code is like assembling IKEA furniture without a manual. Hours vanish, your sanity takes a hit, and somehow, your beautiful design looks like it lost a fight with CSS. And don't even get me started on naming variables—because somehow, `containerDivFinal_Final2` always sneaks in. This gap between design and development has been a major speed bump in shipping polished products efficiently.

Enter Phoenix Codie - the solution to this chaos. It accepts Figma URLs or file keys, extracts design structure through the Figma API, and generates corresponding React components with matching styles. No "why is this misaligned?" breakdowns, no extra drama - just clean, production-ready code that actually works.

Let me spill some tea on how I built it, the "fun" (_read: rage-inducing_) roadblocks I hit, and the facepalms I collected along the way. If you're a dev, a designer, or just curious about this cool tech mashup, buckle up, this is gonna be a ride!

## The Big Problem

So, here's the tea: converting Figma designs into code is slow and frustrating. It's not as fun as debugging a production issue on a Friday night. Developers spend hours figuring out:

- How to translate Figma layouts into CSS without summoning the dark forces of `!important`.
- Which props to use and where.
- Keeping components reusable and design-system-approved (because future you will 100% judge past you).

And let's be honest—most design-to-code tools give you meh output. You get some messy HTML/CSS that feels outdated, like it's stuck in 2010. No React vibes, no reusable components, and definitely no love for design systems.

## Key Features

- **Design-to-Code Conversion**: Phoenix Codie accepts Figma file URLs or file keys, intelligently identifies components from Figma designs, detects layout patterns, and accurately extracts styling properties.

- **User Interface**: Features a split-panel view with generated React markup and styles, real-time preview of components, version history tracking, and support for both dark and light modes.

- **Code Enhancement**: Includes an AI-assisted chat interface for refinement, supports direct download of generated code, offers framework conversion capabilities, and provides tools for integrating API endpoints or JSON data.

## The Plan: Smarter, Not Harder

We wanted Phoenix Codie to be a specialist, not just another half-baked, "look-ma-I-exported-HTML" tool. Phoenix Codie employs a client-server architecture with several specialized subsystems:

The plan involved building a sophisticated system with these key components:

1. **Client Application:** React-based frontend for user interaction and code display
2. **API Server:** Express.js backend that communicates with the Figma API
3. **Parsing Engine:** System to transform Figma API responses into an intermediate representation
4. **Code Generation System:** Converts the intermediate representation into React components
5. **LLM Service:** Handles AI-assisted code refinement through a chat interface

The typical data flow works like this:

1. User inputs a Figma URL through the web interface
2. Server extracts the file key and node ID from the URL
3. Server requests design data from the Figma API using authentication tokens
4. Design data is processed through the parsing engine
5. Component structures and styles are extracted and mapped to React equivalents
6. Generated code is sent back to the client for display and preview
7. User can refine the code via direct editing or AI assistance
8. Final code can be downloaded or saved for later use

## The Alchemist Engine - The Execution

The heart of Phoenix Codie lies in its Alchemist engine — a sophisticated system for analyzing and transforming Figma designs into React components. Let me give you the lowdown on how this powerhouse runs the show.

### Core Architecture

The Alchemist engine consists of several key systems working in harmony:

### 1. Layout Pattern Detection System

When a developer looks at a design—let's say a grid layout—they'd visually identify the elements and think, "Ok, these elements are aligned both horizontally and vertically with consistent spacing - this is clearly a grid layout." It's similar to how we instinctively recognize a spreadsheet pattern.

First, I wanted to spot how the elements are arranged. When elements are positioned in the design, check their coordinates and grouping. For example:

```
Element 1: (x: 0, y: 0)
Element 2: (x: 200, y: 0)
Element 3: (x: 400, y: 0)
Element 4: (x: 0, y: 200)
Element 5: (x: 200, y: 200)
Element 6: (x: 400, y: 200)
```

If elements share the same x-coordinate (or close enough) and have consistent spacing on the y-axis - it's a vertical stack. Flip it, reverse it, do a little dance, and boom—you've now got a horizontal stack. Easy, right?

But then… then comes the dark side. The GAPS.

After a few "maybe I should quit and become a goat farmer" moments, I got some sage advice, got myself a ruler and got to work.

I used the x and y coordinates and the size of the elements to:

- Measure gaps between elements
- Identify consistent spacing patterns
- Convert absolute spacing to relative units

### 2. Layout Extractor

Once the layout pattern is identified, it's time to apply the layout properties with respect to itself and the parent-child and sibling relationships.

The main goals are to get and standardize basic layout properties, deal with auto-layout conversion, handle padding and spacing precisely, and make the resulting layout structure as good as possible.

To go about this, we'll need:

- The element's exact position (x, y coordinates)
- Its dimensions (width and height)
- How it relates to its parent container, and
- Whether it uses Figma's auto-layout (it's Figma's way of saying 'flexbox')

When Figma says "this is an auto-layout container" it means it's a flexbox. I made a mapping system that goes like this:

- HORIZONTAL layout → flex-direction: row
- VERTICAL layout → flex-direction: column
- primaryAxisAlignItems → justify-content
- counterAxisAlignItems → align-items

### 3. Position Detection System

The Position Detection System is the brains behind perfect element placement. Here's how it works:

- Scans positions → Checks where elements sit in relation to each other
- Spots alignment patterns → Detects if things are lined up
- Assigns CSS positioning → No more position: absolute abuse
- Handles edge cases → Overlaps and nested elements

It's basically the GPS for the UI elements—mapping out their placement like a 3D coordinate system but for web layouts.

## The Glow-Up: Results & Impact

With Phoenix Codie, what used to take hours now takes minutes. Some quick stats:

- **70% faster** component implementation.
- Clean, high-quality React code that actually follows design-system rules.
- Less need for reworks.

Developers who've tried it are like, "Where has this been all my life?"

Alright, Let's talk numbers—because nothing says "trust me, bro" like cold, hard stats. Old-school vs. Phoenix Codie.

**Aspero Desktop:**

- Regular approach: 8 - 9 hours
- Phoenix Codie: 2 - 3 hours

**Aspero Mobile:**

- Regular approach: 8 - 9 hours
- Phoenix Codie: 2 - 3 hours

**Acumen:**

- Regular approach:
  - Existing setup - 7 to 8 hrs
  - New setup - 14 to 16 hrs
- Phoenix Codie: 2 - 3 hours

### Why Codie Slaps

- ✅ Time Savings → 70-80% faster
- ✅ Cleaner Code → Consistent, optimized, responsive out of the box, standardized component patterns
- ✅ Cost Efficiency → Less dev time = quicker launches
- ✅ Standardization → Sticks to the design system, no random styles floating around

TL;DR—Codie takes dev time from "ugh" to "done" in no time.

## Lessons From the Grind

Building Phoenix Codie was like trying to assemble a jigsaw puzzle where half the pieces are invisible and the other half explode on contact. Converting Figma's positioning madness into sleek, maintainable Flexbox and Grid layouts was the biggest challenge. At this point, I don't even code—I just perform dark rituals and hope the CSS gods grant me mercy.

### 1. Layouts Are Tricky

Figma uses absolute positioning but React leans on Flexbox/Grid. They don't exactly shake hands. Translation is _Hard_. Guess who had to play translator? Yeah.

Figma's auto-layout system, while powerful, doesn't map perfectly to CSS Flexbox and Grid.

1. Spacing Inconsistencies: Figma's spacing model needed careful translation to CSS
2. Nested Auto-layouts: Complex nested layouts required special handling
3. Responsive Considerations: Making the generated code responsive while maintaining design fidelity

### 2. Nested Components = Chaos

One of the biggest surprises was the complexity of handling nested components. What seemed straightforward in theory became complex when dealing with real-world designs. A button, for instance. It has hover states, focus styles, active states, disabled versions, and a hidden variant for some reason. Codie handles this gracefully by breaking down each layer into props.

### 3. Error Handling Saves Lives

Early versions of Codie simply failed on invalid inputs. One wrong move, and the whole thing went down. But we leveled up.

1. Graceful Degradation: When certain properties couldn't be extracted, the system falls back to sensible defaults.
2. Detailed Error Reporting: Instead of vague "something broke" messages, you actually get useful info.
3. Recovery Mechanisms: The ability to continue processing even when parts of the design are invalid.

### 4. Documentation Importance

You know what's fun? Building cool stuff. You know what's not fun? Trying to remember how that cool stuff works six months later.

That's why we created detailed docs for:

1. Component mappings
2. Property translations
3. Style conversions
4. Common error scenarios

This documentation proved invaluable. Because Telepathy Isn't a Feature (Yet).

The most valuable lesson was the importance of real-world testing with actual design files, as they often contained edge cases that weren't covered by our initial test suite. There were a lot of "well, that's new" moments.

TL;DR – Docs matter. Testing matters. And design patterns are your friends.

## Business Value & Conclusion

Phoenix Codie provides significant value in the design-to-development workflow:

1. **Time Savings:** Reduces the time required to translate designs into code by 60-80%
2. **Consistency:** Ensures consistent implementation of design elements across applications
3. **Quality:** Generates optimized, clean code that follows best practices
4. **Collaboration:** Improves designer-developer collaboration by providing a common reference point
5. **Iteration Speed:** Enables rapid design iteration by quickly reflecting changes in code

Phoenix Codie represents a sophisticated solution to the persistent challenge of translating designs into code. We took the design-dev handshake, slapped some AI into it, and made the whole process ridiculously smooth. No more nightmares, no more therapy sessions. Just clean, fast, and design-accurate code that makes devs and designers finally get along (well, mostly).

The system's architecture demonstrates a thoughtful approach to the problem, with specialized modules handling different aspects of the conversion process and a user-friendly interface that makes the tool accessible to both developers and designers. The integration of AI assistance further enhances its capabilities, allowing for natural language refinement of the generated code.

Codie streamlines workflows, keeps code clean, and ensures that what you design is what you ship. The only question is: Are you in?
