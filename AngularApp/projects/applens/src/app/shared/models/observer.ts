namespace Observer {
    export interface ObserverSiteResponse {
        siteName: string;
        details: ObserverSiteInfo[];
    }

    export interface ObserverContainerAppResponse {
        containerAppName: string;
        details: ObserverContainerAppInfo[];
    }

    export interface ObserverStaticWebAppResponse {
        defaultHostNameOrAppName: string;
        details: ObserverStaticWebAppInfo[];
        
    }
  
    export interface ObserverSiteInfo {
        SiteName: string;
        StampName: string;
        InternalStampName: string;
        Subscription: string;
        WebSpace: string;
        ResourceGroupName: string;
        SlotName: string;
        GeomasterName: string;
        GeomasterServiceAddress: string;
        Kind: string,
        IsLinux?: boolean;
        VnetName: string;
        LinuxFxVersion: string;
        WindowsFxVersion: string;
        AppServicePlan?: string;
    }

    export interface ObserverSiteSku {
        kind: string;
        is_linux: boolean;
        sku: Sku;
        server_farm_name: string;
        actual_number_of_workers: number;
        current_worker_size: number;
    }

    export interface ObserverContainerAppInfo {
        ContainerAppName: string;
        Tags: string;
        ResourceGroupName: string;
        SubscriptionName: string;
        KubeEnvironmentName: string;
        Fqdn: string;
        Location: string;
        GeoMasterName: string;
        ServiceAddress: string;
        Kind: string;
        IsInAppNamespace: boolean;
    }

    export interface ObserverStaticWebAppInfo {
        ApiKey: string;
        Branch: string;
        BuildInfo: any[];
        CustomDomains: string;
        DefaultHostname: string;
        GeoMasterInstance: string;
        Name: string;
        RepositoryUrl: string;
        ResourceGroupName: string;
        Sku: string;
        StorageRing: string;
        SubscriptionName: string;
    }

    export interface ObserverSiteDetailsResponse {
        siteName: string;
        details: ObserverSiteDetailsInfo;
    }

    export interface ObserverSiteDetailsInfo {
        name: string;
        tags: string;
        kind: string;
        namespacedescriptor: string;
        islinux: boolean;
        defaulthostname: string;
        scmsitehostname: string;
        webspace: string;
        hostnames: any;
        resourcegroup: string;
        vnetname: string;
        linuxfxversion: string;
        stamp: any;
    }

    export interface ObserverAseResponse {
        details: ObserverAseInfo;
    }
  
    export interface ObserverAseInfo {
        ID: number;
        Name: string;
        LocationId: number;
        PublicHost: string;
        VNETName: string;
        VNETId: string;
        VNETSubnetName: string;
        WebWorkerSize: string;
        WebWorkerRoleCount: number;
        MultiSize: string;
        MultiRoleCount: number;
        IPSSLAddressCount: number;
        MonitoringDataAccountId: number;
        SmallDedicatedWebWorkerSize: string;
        SmallDedicatedWebWorkerRoleCount: number;
        MediumDedicatedWebWorkerSize: string;
        MediumDedicatedWebWorkerRoleCount: number;
        LargeDedicatedWebWorkerSize: string;
        LargeDedicatedWebWorkerRoleCount: number;
        Allocated: boolean;
        DatabaseEdition: string;
        DatabaseServiceObjective: string;
        MaximumNumberOfMachines: number;
        UpgradeDomains: number;
        VNETSubnetAddressRange: string;
        DeploymentOrder: number;
        AllowedMultiSizes?: null;
        AllowedWorkerSizes?: null;
        DefinitionsPath?: null;
        SettingsPath?: null;
        UserServiceEndpoint: string;
        CustomerSubscriptionId: string;
        VNETResourceGroup: string;
        DeletedOn?: null;
        DatabaseServerVersion: string;
        Suspended: boolean;
        ManualResumeOnly: boolean;
        ExtraDefinitions: string;
        InternalLoadBalancingMode: number;
        ApiHubEnabled: boolean;
        VNETSubscriptionId: string;
        CustomBuild: boolean;
        ClusterSettings?: null;
        DnsSuffix?: null;
        VNETResourceType: string;
        DynamicCacheEnabled: boolean;
        FileServerRoleCount: number;
        EnvironmentType: number;
        InternalStampName: string;
        Subscription: string;
        ResourceGroupName: string;
        GeomasterName: string;
        GeomasterServiceAddress: string;
    }

    export interface ObserverStampInfo {
        Name: string;
        SubscriptionId: string;
        StampType: string;
        DNS: string;
        VIP: string;
        DeploymentId: string;
        Cluster: string;
        IsFlexStamp: string;
        GeoLocation: string;
    }

    export interface ObserverStampResponse {
        name: string;
        details: any;
    }

    export enum Sku {
        Free = 1 << 0,
        Shared = 1 << 1,
        Dynamic = 1 << 2,
        Basic = 1 << 3,
        Standard = 1 << 4,
        Premium = 1 << 5,
        PremiumV2 = 1 << 6,
        Isolated = 1 << 7,
        PremiumContainer = 1 << 8, // 100000000
        ElasticPremium = 1 << 9, // 1000000000
        Paid = 1016,         // 1111111000
        NotDynamicAndElasticPremium = 507,    // 111111011 Not Dynamic or ElasticPremium
        NotDynamic = 1019,   // 1111111011
        PaidDedicated =  504, // 111111000: Paid & Dedicated
        All = (1 << 10) - 1           // 1111111111
    }
  }
