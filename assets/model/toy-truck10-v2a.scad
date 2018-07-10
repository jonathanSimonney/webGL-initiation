// Tiny Toy Dump Truck
// No support needed, no assembly required (*)
// (*) some cleanup will probably be necessary, however
// Created by: Madscifi
// License - Public domain
// Inspired by (but not really derived from)
// toy tanker truck by jag (thingiverse thing:5273)

// Sliced with Skeinforge using:
//  0.2mm - Layer Thickness
//  2.5 - Perimeter Width over Thickness (ratio)

// V2	moved support_width definition to the start of the script, and fixed the positioning of the cab
//	so it is positioned correctly in the case that wheel_dia or bed_lift is modified.
//	As delivered, this version prints essentially the same as the previous version unless
//	you modify wheel_dia or bed_lift.

wheel_dia=12.5;
wheel_flat_thickness=3;
wheel_conic_dist=6;
wheel_base_dist=18;
wheel_cutout_extra=1;
axle_cutout=0.75;
axle_dia=6;
axle_len=4;
body_lift=2;
bed_axle_dia=3;
bed_axle_cutout=1;
bed_axle_bearing_extra=1;
bed_height=10;
bed_len=20;
bed_wall=2.5;
bed_axle_bearing_wall=1;
bed_bearing_cutout=1;
cab_sep=1;
cab_wall=2;
cab_roof=1;
support_width=6;

width=wheel_flat_thickness*2+wheel_conic_dist*2+axle_len;
length=wheel_base_dist+wheel_dia+wheel_cutout_extra*4;
bearing_dia=bed_axle_dia+bed_axle_cutout*2+bed_axle_bearing_wall*2;

// If you change the size of things this is the one value that is 
// completely emperical - you'll probably need to tweek this.
bed_axle_slice_offset=-width/4+support_width/2+bed_axle_cutout*2.5;

module wheel(extra,aextra)
{
	union()
	{
		translate([0,0,wheel_conic_dist]) cylinder(h=wheel_flat_thickness+extra,r=wheel_dia/2+extra);
		translate([0,0,-extra/20]) cylinder(h=wheel_conic_dist+extra/10,r1=axle_dia/2+aextra,r2=wheel_dia/2+extra);
	}
}
module axle(extra,aextra)
{
	union()
	{
		translate([0,-axle_len/2,0]) rotate([90,0,0]) wheel(extra,aextra);
		translate([0,axle_len/2,0]) rotate([-90,0,0]) wheel(extra,aextra);
		translate([0,axle_len/2+0.1,0]) rotate([90,0,0]) cylinder(h=axle_len+0.2,r=axle_dia/2+aextra);
	}
}


module bed()
{
	cutout_dia = bed_axle_dia+bed_axle_cutout*2;
	bearing_len=width/2-support_width/2-bed_axle_cutout;

	union()
	{
		difference()
		{
			translate([bed_len/2,0,bed_height/2]) 
				cube([bed_len,width,bed_height],center=true);
			translate([bed_len/2,0,bed_height/2+bed_axle_dia/2]) 
				cube([bed_len-bed_wall,width-bed_wall,bed_height-bed_wall],center=true);
			rotate([90,0,0]) cylinder(h=width+0.01,r=cutout_dia/2,center=true);
		}
		difference()
		{
			translate([0, width/4,0]) 
			difference()
			{
				rotate([90,0,0]) cylinder( h=width/2,r=bearing_dia/2,center=true);
				translate([0,bed_axle_slice_offset,0]) 
					rotate([0,0,45]) translate([-50,0,0]) 
						cube([100,100,100],center=true);
			}
			rotate([90,0,0]) cylinder( h=width+0.2, r=cutout_dia/2, center=true);
			
		}
		difference()
		{
			translate([0, -bearing_len/2-support_width/2-bed_axle_cutout,0]) 
				rotate([90,0,0]) 
					cylinder( h=bearing_len,r=bearing_dia/2,center=true);
			rotate([90,0,0]) cylinder( h=width+0.2, r=cutout_dia/2, center=true);
		}
	}
}

module bed_axle()
{
         union()
         {
		rotate([90,0,0]) cylinder(h=width,r=bed_axle_dia/2,center=true);
		translate([0,0,-bed_axle_dia]) cube([bed_axle_dia,6,bed_axle_dia*2],center=true);
          }
}

module bed_axle_cutout()
{
	rotate([90,0,0]) cylinder(h=width+0.1,r=bearing_dia/2+bed_bearing_cutout,center=true);
}

module cab()
{
	translate([-(length-bed_len-bed_axle_dia/2-cab_sep)/2,0,bed_height/2])
	difference()
	{
		cube([length-bed_len-bed_axle_dia/2-cab_sep,width,bed_height],center=true);
		translate([cab_wall,0,(cab_wall-cab_roof)/2]) cube([length-bed_len-bed_axle_dia/2-cab_sep,width+0.1,bed_height-cab_wall-cab_roof],center=true);
	}
}

translate([0,0,width/2])
rotate([90,0,0])
{
	union()
	{
		// body
		difference()
		{
			translate([0,0,body_lift]) cube([length,width,wheel_dia],center=true);
			translate([wheel_base_dist/2,0,0]) axle(wheel_cutout_extra,axle_cutout);
			translate([-wheel_base_dist/2,0,0]) axle(wheel_cutout_extra,axle_cutout);
			translate([-length/2+bed_axle_dia/2,0,wheel_dia/2+body_lift+1]) bed_axle_cutout();
		}
		
		// wheels and axles
		translate([wheel_base_dist/2,0,0]) axle(0,0);
		translate([-wheel_base_dist/2,0,0]) axle(0,0);
	
		// bed
		translate([-length/2+bed_axle_dia/2,0,wheel_dia/2+body_lift+1]) 
		{
			bed_axle();
		}
	
		// cab
		translate([(length/2),0,wheel_dia/2+body_lift-0.01]) cab();

		translate([-length/2+bed_axle_dia/2,0,wheel_dia/2+body_lift+1]) 
		{
			bed();
		}
	}
}
